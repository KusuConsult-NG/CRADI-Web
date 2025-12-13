'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
    BookOpen,
    Plus,
    Edit,
    Trash2,
} from 'lucide-react';
import Link from 'next/link';

export default function LecturerCoursesPage() {
    const courses = [
        {
            id: '1',
            title: 'Machine Learning Fundamentals',
            code: 'CS 601',
            students: 45,
            status: 'Active',
        },
        {
            id: '2',
            title: 'Data Science Masterclass',
            code: 'CS 605',
            students: 38,
            status: 'Active',
        },
        {
            id: '3',
            title: 'Advanced Algorithms',
            code: 'CS 603',
            students: 52,
            status: 'Active',
        },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">My Courses</h1>
                        <p className="text-gray-400">Manage your courses and track student progress</p>
                    </div>
                    <Button variant="primary">
                        <Plus className="w-4 h-4" />
                        Create Course
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Card key={course.id} className="hover:shadow-glow">
                            <CardHeader>
                                <Badge variant="info" className="mb-2">{course.code}</Badge>
                                <CardTitle>{course.title}</CardTitle>
                                <p className="text-sm text-gray-400">{course.students} students</p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Badge variant="success">{course.status}</Badge>
                                <div className="flex gap-2">
                                    <Link href={`/lecturer/courses/${course.id}`} className="flex-1">
                                        <Button variant="primary" size="sm" className="w-full">
                                            Manage Course
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="sm">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
