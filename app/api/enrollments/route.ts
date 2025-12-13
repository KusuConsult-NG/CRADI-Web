import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

// POST /api/enrollments - Create new enrollment
export async function POST(request: NextRequest) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (!decoded || decoded.role !== 'STUDENT') {
            return NextResponse.json({ error: 'Only students can enroll in courses' }, { status: 403 });
        }

        const body = await request.json();
        const { courseId, waiverCode } = body;

        if (!courseId) {
            return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
        }

        // Check if already enrolled
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: decoded.id,
                    courseId: courseId,
                },
            },
        });

        if (existingEnrollment) {
            return NextResponse.json({ error: 'Already enrolled in this course' }, { status: 400 });
        }

        // Get course details
        const course = await prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        if (!course.isPublished || !course.isActive) {
            return NextResponse.json({ error: 'Course is not available for enrollment' }, { status: 400 });
        }

        let payment = null;
        let finalAmount = course.priceNGN;
        let waiver = null;

        // Handle waiver code if provided
        if (waiverCode) {
            waiver = await prisma.waiverCode.findUnique({
                where: { code: waiverCode },
            });

            if (!waiver || !waiver.isActive) {
                return NextResponse.json({ error: 'Invalid waiver code' }, { status: 400 });
            }

            // Check if waiver is still valid
            const now = new Date();
            if (waiver.validUntil && waiver.validUntil < now) {
                return NextResponse.json({ error: 'Waiver code has expired' }, { status: 400 });
            }

            if (waiver.validFrom > now) {
                return NextResponse.json({ error: 'Waiver code is not yet valid' }, { status: 400 });
            }

            if (waiver.usedCount >= waiver.maxUses) {
                return NextResponse.json({ error: 'Waiver code has been fully used' }, { status: 400 });
            }

            // Calculate discount
            if (waiver.discountType === 'PERCENTAGE') {
                finalAmount = finalAmount * (1 - waiver.discountValue / 100);
            } else if (waiver.discountType === 'FIXED_AMOUNT') {
                finalAmount = Math.max(0, finalAmount - waiver.discountValue);
            } else if (waiver.discountType === 'FULL_WAIVER') {
                finalAmount = 0;
            }
        }

        // Create payment record
        payment = await prisma.payment.create({
            data: {
                userId: decoded.id,
                amount: finalAmount,
                currency: 'NGN',
                status: finalAmount === 0 ? 'COMPLETED' : 'PENDING',
                reference: `PAY-${Date.now()}-${Math.random().toString(36).substring(7)}`,
                waiverCodeId: waiver?.id,
                discountAmount: course.priceNGN - finalAmount,
                paidAt: finalAmount === 0 ? new Date() : null,
            },
        });

        // If fully waived, create enrollment immediately
        if (finalAmount === 0) {
            const enrollment = await prisma.enrollment.create({
                data: {
                    userId: decoded.id,
                    courseId: courseId,
                    status: 'ACTIVE',
                    paymentId: payment.id,
                },
                include: {
                    course: {
                        select: {
                            id: true,
                            code: true,
                            title: true,
                            thumbnail: true,
                            lecturer: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });

            // Update waiver code usage
            if (waiver) {
                await prisma.waiverCode.update({
                    where: { id: waiver.id },
                    data: { usedCount: waiver.usedCount + 1 },
                });
            }

            // Update course enrollment count
            await prisma.course.update({
                where: { id: courseId },
                data: { enrolledCount: { increment: 1 } },
            });

            // Create notification
            await prisma.notification.create({
                data: {
                    userId: decoded.id,
                    title: 'Enrollment Successful',
                    message: `You have successfully enrolled in ${course.title}`,
                    type: 'ENROLLMENT',
                    link: `/student/courses/${courseId}`,
                },
            });

            return NextResponse.json({
                success: true,
                enrollment,
                message: 'Successfully enrolled in course',
            });
        }

        // Return payment details for checkout
        return NextResponse.json({
            success: true,
            requiresPayment: true,
            payment: {
                id: payment.id,
                amount: finalAmount,
                reference: payment.reference,
                course: {
                    title: course.title,
                    code: course.code,
                },
            },
        });
    } catch (error) {
        console.error('Enrollment error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET /api/enrollments - Get user's enrollments
export async function GET(request: NextRequest) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '');
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const enrollments = await prisma.enrollment.findMany({
            where: {
                userId: decoded.id,
                status: {
                    in: ['ACTIVE', 'COMPLETED'],
                },
            },
            include: {
                course: {
                    select: {
                        id: true,
                        code: true,
                        title: true,
                        description: true,
                        thumbnail: true,
                        duration: true,
                        lecturer: {
                            select: {
                                name: true,
                            },
                        },
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

        // Calculate progress for each enrollment
        const enrichedEnrollments = await Promise.all(
            enrollments.map(async (enrollment) => {
                const totalLessons = await prisma.lesson.count({
                    where: {
                        module: {
                            courseId: enrollment.courseId,
                        },
                    },
                });

                const completedLessons = enrollment.lessonProgress.filter(
                    (progress) => progress.isCompleted
                ).length;

                const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

                return {
                    ...enrollment,
                    calculatedProgress: Math.round(progress),
                    totalLessons,
                    completedLessons,
                };
            })
        );

        return NextResponse.json({ enrollments: enrichedEnrollments });
    } catch (error) {
        console.error('Get enrollments error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
