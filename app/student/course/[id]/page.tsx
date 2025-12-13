'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import {
    BookOpen,
    CheckCircle,
    Clock,
    Play,
    FileText,
    Video,
    Lock,
    Award,
    Download,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function StudentCoursePage() {
    const params = useParams();
    const courseId = params?.id as string;

    // Mock course data
    const course = {
        id: courseId,
        code: 'CS 601',
        title: 'Machine Learning Fundamentals',
        instructor: 'Dr. Sarah Johnson',
        progress: 65,
        grade: 85,
        modules: [
            {
                id: '1',
                title: 'Introduction to ML',
                lessons: [
                    { id: '1-1', title: 'What is Machine Learning?', duration: '15 min', completed: true, type: 'video' },
                    { id: '1-2', title: 'Types of ML Algorithms', duration: '20 min', completed: true, type: 'video' },
                    { id: '1-3', title: 'ML Workflow', duration: '18 min', completed: true, type: 'video' },
                    { id: '1-4', title: 'Quiz: Introduction', duration: '10 min', completed: false, type: 'quiz' },
                ],
            },
            {
                id: '2',
                title: 'Supervised Learning',
                lessons: [
                    { id: '2-1', title: 'Linear Regression', duration: '25 min', completed: true, type: 'video' },
                    { id: '2-2', title: 'Logistic Regression', duration: '22 min', completed: true, type: 'video' },
                    { id: '2-3', title: 'Decision Trees', duration: '30 min', completed: false, type: 'video' },
                    { id: '2-4', title: 'Assignment: Build a Model', duration: '120 min', completed: false, type: 'assignment' },
                ],
            },
            {
                id: '3',
                title: 'Neural Networks',
                lessons: [
                    { id: '3-1', title: 'Perceptrons', duration: '20 min', completed: false, type: 'video', locked: true },
                    { id: '3-2', title: 'Backpropagation', duration: '25 min', completed: false, type: 'video', locked: true },
                ],
            },
        ],
    };

    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons = course.modules.reduce(
        (sum, m) => sum + m.lessons.filter((l) => l.completed).length,
        0
    );

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/student/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Dashboard
                    </Button>
                </Link>

                {/* Course Header */}
                <Card className="mb-8">
                    <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <Badge variant="info" className="mb-2">{course.code}</Badge>
                                <h1 className="text-4xl font-bold text-white mb-2">{course.title}</h1>
                                <p className="text-gray-400">Instructor: {course.instructor}</p>
                            </div>
                            <Badge variant="success">Active</Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-gray-400 mb-2">Progress</p>
                                <div className="text-2xl font-bold text-white mb-2">{course.progress}%</div>
                                <Progress value={course.progress} variant="gradient" showLabel={false} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-2">Current Grade</p>
                                <div className="text-2xl font-bold text-white">{course.grade}%</div>
                                <Badge variant={course.grade >= 80 ? 'success' : 'warning'} className="mt-2">
                                    {course.grade >= 80 ? 'Excellent' : 'Good'}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-2">Completed</p>
                                <div className="text-2xl font-bold text-white">
                                    {completedLessons}/{totalLessons} lessons
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Course Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Course Content</h2>
                        </div>

                        {course.modules.map((module) => (
                            <Card key={module.id}>
                                <CardHeader>
                                    <CardTitle>{module.title}</CardTitle>
                                    <p className="text-sm text-gray-400">
                                        {module.lessons.filter((l) => l.completed).length}/{module.lessons.length} lessons completed
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {module.lessons.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className={`flex items-center justify-between p-4 rounded-lg transition-smooth ${lesson.locked
                                                ? 'bg-white/5 opacity-50'
                                                : 'bg-white/5 hover:bg-white/10 cursor-pointer'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${lesson.completed
                                                        ? 'bg-green-500/20'
                                                        : lesson.locked
                                                            ? 'bg-gray-500/20'
                                                            : 'bg-primary-500/20'
                                                        }`}
                                                >
                                                    {lesson.locked ? (
                                                        <Lock className="w-5 h-5 text-gray-400" />
                                                    ) : lesson.type === 'video' ? (
                                                        <Video className="w-5 h-5 text-primary-400" />
                                                    ) : lesson.type === 'quiz' ? (
                                                        <FileText className="w-5 h-5 text-primary-400" />
                                                    ) : (
                                                        <FileText className="w-5 h-5 text-primary-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white">{lesson.title}</h4>
                                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{lesson.duration}</span>
                                                        </div>
                                                        {lesson.type === 'assignment' && (
                                                            <Badge variant="warning" className="text-xs">Assignment</Badge>
                                                        )}
                                                        {lesson.type === 'quiz' && (
                                                            <Badge variant="info" className="text-xs">Quiz</Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {lesson.completed ? (
                                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                                ) : lesson.locked ? (
                                                    <Lock className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <Play className="w-5 h-5 text-primary-400" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href="/student/assignments">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <FileText className="w-5 h-5" />
                                        Assignments
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => alert('Course Materials:\n\n• Lecture Slides (PDF)\n• Code Examples (GitHub)\n• Additional Resources\n• Practice Datasets\n\nDownload links will be available here.')}
                                >
                                    <Download className="w-5 h-5" />
                                    Course Materials
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => alert(`Your Grades for ${course.title}:\n\nAssignments: 88/100\nQuizzes: 92/100\nMidterm: 85/100\n\nCurrent Grade: ${course.grade}%\n\nDetailed grade breakdown coming soon!`)}
                                >
                                    <Award className="w-5 h-5" />
                                    Grades
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Course Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <p className="text-gray-400">Instructor</p>
                                    <p className="text-white font-semibold">{course.instructor}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Course Code</p>
                                    <p className="text-white font-semibold">{course.code}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Total Lessons</p>
                                    <p className="text-white font-semibold">{totalLessons}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">My Progress</p>
                                    <Progress value={course.progress} variant="success" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
