'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Award, Download, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CertificatesPage() {
    // Mock data - in real app, this would come from API
    const hasCompletedCourses = false; // Change to true to see certificates

    const completedCourses = [
        {
            id: '1',
            title: 'Web Development Bootcamp',
            code: 'CS 101',
            completionDate: '2025-11-15',
            grade: 'A',
            certificateId: 'CRADI-2025-CS101-001234',
            instructor: 'Prof. Michael Chen',
        },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        My <span className="text-gradient-primary">Certificates</span>
                    </h1>
                    <p className="text-gray-400">View and download your course completion certificates</p>
                </div>

                {/* Empty State - No Completed Courses */}
                {!hasCompletedCourses ? (
                    <Card className="p-12 text-center animate-fade-in-up">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary-400/20 to-secondary-600/20 flex items-center justify-center">
                                <AlertCircle className="w-12 h-12 text-orange-400" />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-4">
                                No Certificates Yet
                            </h2>

                            <p className="text-gray-400 mb-2">
                                You are yet to complete your coursework.
                            </p>
                            <p className="text-gray-500 text-sm mb-8">
                                Complete your enrolled courses to earn certificates and showcase your achievements.
                            </p>

                            <div className="space-y-4">
                                <Link href="/courses">
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                                        <BookOpen className="w-5 h-5" />
                                        Browse Courses
                                    </Button>
                                </Link>

                                <Link href="/student/dashboard">
                                    <Button variant="ghost" size="lg" className="w-full sm:w-auto ml-0 sm:ml-3">
                                        Back to Dashboard
                                    </Button>
                                </Link>
                            </div>

                            {/* Progress Tip */}
                            <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <div className="flex items-start gap-3 text-left">
                                    <Award className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-blue-300 mb-1">How to Earn Certificates</h3>
                                        <p className="text-xs text-gray-400">
                                            Complete all course modules, pass assessments, and maintain the required grade to earn your certificate.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ) : (
                    /* Certificates Grid - When courses are completed */
                    <div className="space-y-6">
                        {completedCourses.map((course, index) => (
                            <Card key={course.id} className="hover:shadow-glow transition-smooth animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                                                    <Award className="w-6 h-6 text-primary-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{course.title}</h3>
                                                    <p className="text-sm text-gray-400">{course.code}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="success">Completed</Badge>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Completion Date</p>
                                            <p className="text-sm text-white font-medium flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {course.completionDate}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Final Grade</p>
                                            <p className="text-sm text-white font-medium">
                                                <Badge variant="success">{course.grade}</Badge>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
                                            <p className="text-xs text-gray-400 font-mono">{course.certificateId}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button variant="primary" className="flex-1">
                                            <Download className="w-4 h-4" />
                                            Download Certificate
                                        </Button>
                                        <Button variant="ghost">
                                            <Award className="w-4 h-4" />
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
