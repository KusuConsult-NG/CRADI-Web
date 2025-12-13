import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/lecturer/courses - Get lecturer's assigned courses
export async function GET(request: NextRequest) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (!decoded || decoded.role !== 'LECTURER') {
            return NextResponse.json({ error: 'Only lecturers can access this endpoint' }, { status: 403 });
        }

        const courses = await prisma.course.findMany({
            where: {
                lecturerId: decoded.id,
                isActive: true,
            },
            include: {
                _count: {
                    select: {
                        enrollments: true,
                        modules: true,
                        assignments: true,
                    },
                },
                enrollments: {
                    where: {
                        status: 'ACTIVE',
                    },
                    select: {
                        id: true,
                        progress: true,
                        currentGrade: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Calculate average grade and progress for each course
        const enrichedCourses = courses.map((course) => {
            const avgGrade = course.enrollments.length > 0
                ? course.enrollments.reduce((sum, e) => sum + (e.currentGrade || 0), 0) / course.enrollments.length
                : 0;

            const avgProgress = course.enrollments.length > 0
                ? course.enrollments.reduce((sum, e) => sum + e.progress, 0) / course.enrollments.length
                : 0;

            return {
                id: course.id,
                code: course.code,
                title: course.title,
                description: course.description,
                thumbnail: course.thumbnail,
                department: course.department,
                duration: course.duration,
                isPublished: course.isPublished,
                students: course._count.enrollments,
                modules: course._count.modules,
                assignments: course._count.assignments,
                averageGrade: Math.round(avgGrade),
                averageProgress: Math.round(avgProgress),
                createdAt: course.createdAt,
            };
        });

        return NextResponse.json({ courses: enrichedCourses });
    } catch (error) {
        console.error('Get lecturer courses error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
