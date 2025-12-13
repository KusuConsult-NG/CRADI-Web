import jwt from 'jsonwebtoken';

// CRITICAL: JWT_SECRET must be set in environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('FATAL: JWT_SECRET environment variable is not set. Application cannot start.');
}

export interface JWTPayload {
    id: string;      // User ID (required for authorization)
    userId: string;  // Keep for backward compatibility
    email: string;
    role: string;
    iat?: number;    // Issued at
    exp?: number;    // Expiry
}

/**
 * Generate a JWT access token
 * Expires in 1 hour for security
 */
export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET!, {
        expiresIn: '1h', // Shorter expiry for better security
        algorithm: 'HS256',
    });
}

/**
 * Generate a refresh token (longer lived)
 */
export function generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    if (!JWT_REFRESH_SECRET) {
        throw new Error('JWT_REFRESH_SECRET not configured');
    }
    return jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: '7d',
        algorithm: 'HS256',
    });
}

/**
 * Verify and decode a JWT token
 * Returns null if token is invalid or expired
 */
export function verifyToken(token: string): JWTPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET!, {
            algorithms: ['HS256'],
        }) as JWTPayload;

        // Ensure backward compatibility - if id is missing but userId exists
        if (!decoded.id && decoded.userId) {
            decoded.id = decoded.userId;
        }

        return decoded;
    } catch (error) {
        // Token is invalid, expired, or malformed
        return null;
    }
}

/**
 * Verify a refresh token
 */
export function verifyRefreshToken(token: string): JWTPayload | null {
    try {
        if (!JWT_REFRESH_SECRET) {
            return null;
        }
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
            algorithms: ['HS256'],
        }) as JWTPayload;

        if (!decoded.id && decoded.userId) {
            decoded.id = decoded.userId;
        }

        return decoded;
    } catch (error) {
        return null;
    }
}

/**
 * Get user from request authorization header
 * Safely extracts and verifies Bearer token
 */
export function getUserFromToken(authHeader: string | null): JWTPayload | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.substring(7).trim(); // Remove 'Bearer ' prefix

    if (!token) {
        return null;
    }

    return verifyToken(token);
}

/**
 * Check if user has required role
 */
export function hasRole(user: JWTPayload | null, allowedRoles: string[]): boolean {
    if (!user) {
        return false;
    }
    return allowedRoles.includes(user.role);
}

/**
 * Middleware helper for role-based access control
 */
export function requireRole(user: JWTPayload | null, allowedRoles: string[]): void {
    if (!hasRole(user, allowedRoles)) {
        throw new Error('Insufficient permissions');
    }
}
