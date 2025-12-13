import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Get query parameters
        const search = searchParams.get('search') || '';
        const department = searchParams.get('department');
        const type = searchParams.get('type');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = {
            isPublished: true,
            isActive: true,
        };

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { code: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (department && department !== 'all') {
            where.department = { equals: department, mode: 'insensitive' };
        }

        if (type && type !== 'all') {
            where.type = type.toUpperCase();
        }

        // Get courses with pagination
        const [courses, total] = await Promise.all([
            prisma.course.findMany({
                where,
                include: {
                    lecturer: {
                        select: {
                            name: true,
                            department: true,
                        },
                    },
                    _count: {
                        select: {
                            enrollments: true,
                            modules: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limit,
            }),
            prisma.course.count({ where }),
        ]);

        return NextResponse.json({
            courses,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });

    } catch (error) {
        console.error('Get courses error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
