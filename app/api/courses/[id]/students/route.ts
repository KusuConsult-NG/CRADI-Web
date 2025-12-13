import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// GET /api/courses/[id]/students - Get enrolled students for a course
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (!decoded || (decoded.role !== 'LECTURER' && decoded.role !== 'ADMIN')) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
        }

        const courseId = params.id;

        // Verify lecturer has access to this course
        if (decoded.role === 'LECTURER') {
            const course = await prisma.course.findUnique({
                where: { id: courseId },
                select: { lecturerId: true },
            });

            if (!course || course.lecturerId !== decoded.id) {
                return NextResponse.json({ error: 'Access denied' }, { status: 403 });
            }
        }

        const enrollments = await prisma.enrollment.findMany({
            where: {
                courseId: courseId,
                status: {
                    in: ['ACTIVE', 'COMPLETED'],
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        studentId: true,
                        avatar: true,
                    },
                },
                lessonProgress: {
                    select: {
                        isCompleted: true,
                    },
                },
            },
            orderBy: {
                enrolledAt: 'desc',
            },
        });

        // Get total lessons for this course
        const totalLessons = await prisma.lesson.count({
            where: {
                module: {
                    courseId: courseId,
                },
            },
        });

        // Enrich student data with progress
        const students = enrollments.map((enrollment) => {
            const completedLessons = enrollment.lessonProgress.filter(
                (progress) => progress.isCompleted
            ).length;

            const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

            return {
                id: enrollment.user.id,
                name: enrollment.user.name,
                email: enrollment.user.email,
                studentId: enrollment.user.studentId,
                avatar: enrollment.user.avatar,
                enrollmentId: enrollment.id,
                enrolledAt: enrollment.enrolledAt,
                status: enrollment.status,
                progress: Math.round(progress),
                grade: enrollment.currentGrade || 0,
                completedLessons,
                totalLessons,
            };
        });

        return NextResponse.json({ students });
    } catch (error) {
        console.error('Get course students error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
