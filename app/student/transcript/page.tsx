'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { FileText, Download, AlertCircle, BookOpen, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function TranscriptPage() {
    // Mock data - in real app, this would come from API
    const hasCompletedCourses = false; // Change to true to see transcript

    const studentInfo = {
        name: 'John Doe',
        studentId: 'CRADI-2025-STU-001234',
        programme: 'MSc Computer Science',
        enrollmentDate: '2025-09-01',
    };

    const completedCourses = [
        {
            id: '1',
            code: 'CS 601',
            title: 'Machine Learning Fundamentals',
            credits: 3,
            grade: 'A',
            gpa: 4.0,
            semester: 'Fall 2025',
        },
        {
            id: '2',
            code: 'CS 101',
            title: 'Web Development Bootcamp',
            credits: 0,
            grade: 'A',
            gpa: 4.0,
            semester: 'Fall 2025',
            type: 'Certificate',
        },
    ];

    const calculateCGPA = () => {
        const creditCourses = completedCourses.filter(c => c.credits > 0);
        if (creditCourses.length === 0) return 0;

        const totalPoints = creditCourses.reduce((sum, course) => sum + (course.gpa * course.credits), 0);
        const totalCredits = creditCourses.reduce((sum, course) => sum + course.credits, 0);

        return (totalPoints / totalCredits).toFixed(2);
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Academic <span className="text-gradient-primary">Transcript</span>
                    </h1>
                    <p className="text-gray-400">View your complete academic record and performance</p>
                </div>

                {/* Empty State - No Completed Courses */}
                {!hasCompletedCourses ? (
                    <Card className="p-12 text-center animate-fade-in-up">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-secondary-500/20 to-secondary-700/20 flex items-center justify-center">
                                <AlertCircle className="w-12 h-12 text-purple-400" />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-4">
                                No Transcript Available
                            </h2>

                            <p className="text-gray-400 mb-2">
                                You are yet to complete your coursework.
                            </p>
                            <p className="text-gray-500 text-sm mb-8">
                                Your academic transcript will be available once you complete courses and receive grades. Start your learning journey today!
                            </p>

                            <div className="space-y-4">
                                <Link href="/courses">
                                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                                        <BookOpen className="w-5 h-5" />
                                        Explore Courses
                                    </Button>
                                </Link>

                                <Link href="/student/dashboard">
                                    <Button variant="ghost" size="lg" className="w-full sm:w-auto ml-0 sm:ml-3">
                                        Back to Dashboard
                                    </Button>
                                </Link>
                            </div>

                            {/* Info Cards */}
                            <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left">
                                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <div className="flex items-start gap-3">
                                        <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-semibold text-blue-300 mb-1">What&apos;s a Transcript?</h3>
                                            <p className="text-xs text-gray-400">
                                                An official record of all your completed courses, grades, and academic achievements.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <div className="flex items-start gap-3">
                                        <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm font-semibold text-green-300 mb-1">Track Your Progress</h3>
                                            <p className="text-xs text-gray-400">
                                                Your CGPA and course performance will be displayed here as you complete courses.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ) : (
                    /* Transcript Content - When courses are completed */
                    <div className="space-y-6">
                        {/* Student Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Student Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Student Name</p>
                                        <p className="text-white font-medium">{studentInfo.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Student ID</p>
                                        <p className="text-white font-medium font-mono text-sm">{studentInfo.studentId}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Programme</p>
                                        <p className="text-white font-medium">{studentInfo.programme}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">CGPA</p>
                                        <p className="text-2xl font-bold text-gradient-primary">{calculateCGPA()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Academic Record */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Academic Record</CardTitle>
                                    <Button variant="primary" size="sm">
                                        <Download className="w-4 h-4" />
                                        Download PDF
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Course Code</th>
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Course Title</th>
                                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Credits</th>
                                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Grade</th>
                                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">GPA</th>
                                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Semester</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {completedCourses.map((course) => (
                                                <tr key={course.id} className="border-b border-white/5 hover:bg-white/5 transition-smooth">
                                                    <td className="py-4 px-4">
                                                        <span className="font-mono text-sm text-white">{course.code}</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-white">{course.title}</span>
                                                        {course.type && <Badge variant="info" className="ml-2 text-xs">{course.type}</Badge>}
                                                    </td>
                                                    <td className="py-4 px-4 text-center text-gray-400">{course.credits}</td>
                                                    <td className="py-4 px-4 text-center">
                                                        <Badge variant="success">{course.grade}</Badge>
                                                    </td>
                                                    <td className="py-4 px-4 text-center text-white font-semibold">{course.gpa.toFixed(2)}</td>
                                                    <td className="py-4 px-4 text-gray-400">{course.semester}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
