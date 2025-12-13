import { NextRequest, NextResponse } from 'next/server';

/**
 * Rate limiter using in-memory store
 * For production, use Redis or similar distributed cache
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of store.entries()) {
        if (value.resetTime < now) {
            store.delete(key);
        }
    }
}, 10 * 60 * 1000);

export interface RateLimitConfig {
    maxRequests: number;    // Maximum number of requests
    windowMs: number;       // Time window in milliseconds
    keyGenerator?: (req: NextRequest) => string; // Custom key generator
}

/**
 * Default key generator using IP address
 */
function defaultKeyGenerator(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';
    return ip;
}

/**
 * Rate limit middleware
 * Returns true if request should be allowed, false if rate limited
 */
export function checkRateLimit(
    req: NextRequest,
    config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
    const keyGen = config.keyGenerator || defaultKeyGenerator;
    const key = keyGen(req);
    const now = Date.now();

    let entry = store.get(key);

    // Create new entry if doesn't exist or expired
    if (!entry || entry.resetTime < now) {
        entry = {
            count: 0,
            resetTime: now + config.windowMs,
        };
        store.set(key, entry);
    }

    // Increment request count
    entry.count++;

    const allowed = entry.count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - entry.count);

    return {
        allowed,
        remaining,
        resetTime: entry.resetTime,
    };
}

/**
 * Create a rate limit response with appropriate headers
 */
export function createRateLimitResponse(
    remaining: number,
    resetTime: number
): NextResponse {
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

    return NextResponse.json(
        {
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter,
        },
        {
            status: 429,
            headers: {
                'Retry-After': retryAfter.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': new Date(resetTime).toISOString(),
            },
        }
    );
}

/**
 * Preset rate limit configurations
 */
export const RateLimits = {
    // Authentication endpoints - 5 attempts per 15 minutes
    AUTH: {
        maxRequests: 5,
        windowMs: 15 * 60 * 1000,
    },

    // Signup - 3 attempts per hour per IP
    SIGNUP: {
        maxRequests: 3,
        windowMs: 60 * 60 * 1000,
    },

    // Password reset - 3 attempts per hour per email
    PASSWORD_RESET: {
        maxRequests: 3,
        windowMs: 60 * 60 * 1000,
    },

    // General API - 100 requests per minute per user
    API: {
        maxRequests: 100,
        windowMs: 60 * 1000,
    },

    // File upload - 10 per hour
    FILE_UPLOAD: {
        maxRequests: 10,
        windowMs: 60 * 60 * 1000,
    },
} as const;

/**
 * Helper to apply rate limiting to an API route
 */
export function withRateLimit(
    handler: (req: NextRequest) => Promise<NextResponse>,
    config: RateLimitConfig
) {
    return async (req: NextRequest): Promise<NextResponse> => {
        const result = checkRateLimit(req, config);

        if (!result.allowed) {
            return createRateLimitResponse(result.remaining, result.resetTime);
        }

        const response = await handler(req);

        // Add rate limit headers to successful responses
        response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
        response.headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

        return response;
    };
}
