import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword } from '@/lib/password';
import { generateToken, generateRefreshToken } from '@/lib/auth';
import { withRateLimit, RateLimits } from '@/lib/rate-limit';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

async function loginHandler(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validatedData = loginSchema.parse(body);

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email },
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true,
                studentId: true,
                department: true,
                avatar: true,
                isActive: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Check if account is active
        if (!user.isActive) {
            return NextResponse.json(
                { error: 'Account is inactive. Please contact support.' },
                { status: 403 }
            );
        }

        // Verify password
        if (!user.password) {
            return NextResponse.json(
                { error: 'Please use Google Sign-In for this account' },
                { status: 400 }
            );
        }

        const isPasswordValid = await comparePassword(validatedData.password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate JWT tokens with proper payload
        const tokenPayload = {
            id: user.id,
            userId: user.id, // Backward compatibility
            email: user.email,
            role: user.role,
        };

        const token = generateToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        // Remove password from response
        const { password, ...userWithoutPassword } = user;

        return NextResponse.json({
            message: 'Login successful',
            user: userWithoutPassword,
            token,
            refreshToken,
        });

    } catch (error) {
        console.error('Login error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Apply rate limiting: 5 login attempts per 15 minutes
export const POST = withRateLimit(loginHandler, RateLimits.AUTH);
