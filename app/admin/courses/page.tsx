'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ManageCoursesPage() {
    const courses = [
        { id: '1', code: 'CS 601', title: 'Machine Learning Fundamentals', students: 45, status: 'Active' },
        { id: '2', code: 'CS 605', title: 'Data Science Masterclass', students: 38, status: 'Active' },
        { id: '3', code: 'MBA 550', title: 'Business Strategy', students: 52, status: 'Active' },
        { id: '4', code: 'CS 603', title: 'Advanced Algorithms', students: 41, status: 'Draft' },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/admin/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Dashboard
                    </Button>
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Manage Courses</h1>
                        <p className="text-gray-400">View and manage all courses in the system</p>
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
                                <p className="text-sm text-gray-400">{course.students} students enrolled</p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Badge variant={course.status === 'Active' ? 'success' : 'warning'}>{course.status}</Badge>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" className="flex-1">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Trash2 className="w-4 h-4 text-red-400" />
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
