'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { BookOpen, Users, Clock, Star, DollarSign, CheckCircle, Tag } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params?.id as string;
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [showWaiverInput, setShowWaiverInput] = useState(false);
    const [waiverCode, setWaiverCode] = useState('');

    // Mock course data
    const course = {
        id: courseId,
        title: 'Machine Learning Fundamentals',
        code: 'CS 601',
        description: 'A comprehensive introduction to machine learning algorithms, from linear regression to neural networks. Learn to build and deploy ML models using Python and modern frameworks.',
        lecturer: 'Dr. Sarah Johnson',
        department: 'Computer Science',
        type: 'Masters Program',
        priceUSD: 499,
        priceNGN: 750000,
        duration: '12 weeks',
        credits: 3,
        rating: 4.8,
        reviews: 156,
        enrolled: 245,
        level: 'Intermediate',
        modules: [
            { id: 1, title: 'Introduction to Machine Learning', lessons: 5 },
            { id: 2, title: 'Supervised Learning', lessons: 8 },
            { id: 3, title: 'Unsupervised Learning', lessons: 6 },
            { id: 4, title: 'Neural Networks', lessons: 10 },
            { id: 5, title: 'Deep Learning', lessons: 7 },
        ],
    };

    const handleEnroll = async () => {
        setIsEnrolling(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to enroll in courses');
                router.push('/login');
                return;
            }

            const response = await fetch('/api/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    courseId: courseId,
                    waiverCode: waiverCode || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Enrollment failed');
            }

            // If enrollment successful (full waiver)
            if (data.success && data.enrollment) {
                alert(`🎉 Successfully enrolled in ${course.title}!\n\nYou can now access course materials from your dashboard.`);
                router.push('/student/dashboard');
                return;
            }

            // If requires payment
            if (data.requiresPayment) {
                alert(`Enrollment initiated!\n\nPayment Required: ₦${data.payment.amount.toLocaleString()}\nReference: ${data.payment.reference}\n\nProceed to complete payment to activate enrollment.`);
                // In a real app, redirect to payment page
                // router.push(`/payment/${data.payment.reference}`);
            }
        } catch (error: any) {
            alert(`Enrollment Error: ${error.message}`);
        } finally {
            setIsEnrolling(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/courses">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Courses
                    </Button>
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Header */}
                        <Card>
                            <CardContent className="p-8">
                                <Badge variant="info" className="mb-3">{course.code}</Badge>
                                <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
                                <p className="text-gray-300 text-lg mb-6">{course.description}</p>

                                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>{course.enrolled} students enrolled</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span>{course.rating} ({course.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{course.credits} credits</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Modules */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Curriculum</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {course.modules.map((module) => (
                                    <div key={module.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-smooth">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold">
                                                {module.id}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">{module.title}</h4>
                                                <p className="text-sm text-gray-400">{module.lessons} lessons</p>
                                            </div>
                                        </div>
                                        <CheckCircle className="w-5 h-5 text-gray-600" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* What You'll Learn */}
                        <Card>
                            <CardHeader>
                                <CardTitle>What You'll Learn</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="grid md:grid-cols-2 gap-3">
                                    {[
                                        'Build machine learning models from scratch',
                                        'Implement supervised and unsupervised algorithms',
                                        'Work with neural networks and deep learning',
                                        'Handle real-world datasets effectively',
                                        'Deploy ML models to production',
                                        'Optimize model performance',
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-300">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Enrollment Card */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold text-white mb-2">
                                        ₦{course.priceNGN.toLocaleString()}
                                    </div>
                                    <div className="text-gray-400">${course.priceUSD}</div>
                                </div>

                                {/* Waiver Code Section */}
                                {!showWaiverInput ? (
                                    <button
                                        onClick={() => setShowWaiverInput(true)}
                                        className="text-sm text-primary-400 hover:text-primary-300 mb-3 flex items-center gap-2"
                                    >
                                        <Tag className="w-4 h-4" />
                                        Have a waiver code?
                                    </button>
                                ) : (
                                    <div className="mb-3">
                                        <Input
                                            label="Waiver Code"
                                            type="text"
                                            placeholder="Enter code (e.g., SCHOLAR2025)"
                                            value={waiverCode}
                                            onChange={(e) => setWaiverCode(e.target.value.toUpperCase())}
                                        />
                                        <button
                                            onClick={() => {
                                                setShowWaiverInput(false);
                                                setWaiverCode('');
                                            }}
                                            className="text-xs text-gray-500 hover:text-gray-400 mt-1"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}

                                <Button
                                    variant="primary"
                                    className="w-full mb-3"
                                    onClick={handleEnroll}
                                    isLoading={isEnrolling}
                                >
                                    {waiverCode ? 'Enroll with Waiver' : 'Enroll Now'}
                                </Button>

                                <Button variant="ghost" className="w-full">
                                    Add to Wishlist
                                </Button>

                                <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Instructor</span>
                                        <span className="text-white font-semibold">{course.lecturer}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Department</span>
                                        <span className="text-white font-semibold">{course.department}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Level</span>
                                        <Badge variant="info">{course.level}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Type</span>
                                        <Badge variant="purple">{course.type}</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Instructor Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About the Instructor</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                                        SJ
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{course.lecturer}</h4>
                                        <p className="text-sm text-gray-400">Senior Lecturer</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300">
                                    PhD in Machine Learning with 10+ years of teaching experience. Published researcher in AI and deep learning.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
