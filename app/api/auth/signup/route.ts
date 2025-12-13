import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';
import { generateToken } from '@/lib/auth';
import { z } from 'zod';

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    phone: z.string().optional(),
    role: z.enum(['STUDENT', 'LECTURER', 'ADMIN']).default('STUDENT'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validatedData = signupSchema.parse(body);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(validatedData.password);

        // Generate student ID if role is STUDENT
        const studentId = validatedData.role === 'STUDENT'
            ? `CRADI-${new Date().getFullYear()}-STU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
            : undefined;

        // Create user
        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
                phone: validatedData.phone,
                role: validatedData.role,
                studentId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                studentId: true,
                createdAt: true,
            },
        });

        // Generate JWT token
        const token = generateToken({
            id: user.id,
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return NextResponse.json(
            {
                message: 'Account created successfully',
                user,
                token,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Signup error:', error);

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
