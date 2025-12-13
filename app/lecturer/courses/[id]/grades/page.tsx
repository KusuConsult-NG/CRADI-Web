'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
    FileText,
    Download,
    Eye,
    CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CourseGradesPage() {
    const params = useParams();
    const courseId = params?.id as string;

    const submissions = [
        { id: '1', student: 'Alice Johnson', assignment: 'ML Assignment 3', score: 88, maxScore: 100, status: 'Graded', submittedAt: '2025-12-10' },
        { id: '2', student: 'Bob Smith', assignment: 'ML Assignment 3', score: null, maxScore: 100, status: 'Pending', submittedAt: '2025-12-11' },
        { id: '3', student: 'Carol Williams', assignment: 'ML Assignment 3', score: 92, maxScore: 100, status: 'Graded', submittedAt: '2025-12-09' },
        { id: '4', student: 'David Brown', assignment: 'ML Assignment 2', score: 75, maxScore: 100, status: 'Graded', submittedAt: '2025-12-08' },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href={`/lecturer/courses/${courseId}`}>
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Course
                    </Button>
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Grading</h1>
                        <p className="text-gray-400">Review and grade student submissions</p>
                    </div>
                    <Button variant="ghost">
                        <Download className="w-4 h-4" />
                        Export Grades
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {submissions.map((submission) => (
                                <div key={submission.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-smooth">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white">{submission.student}</h4>
                                        <p className="text-sm text-gray-400">{submission.assignment}</p>
                                        <p className="text-xs text-gray-500">Submitted: {submission.submittedAt}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {submission.status === 'Graded' ? (
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-white">{submission.score}/{submission.maxScore}</p>
                                                <Badge variant="success" className="text-xs">Graded</Badge>
                                            </div>
                                        ) : (
                                            <Badge variant="warning">Pending</Badge>
                                        )}
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            {submission.status === 'Pending' && (
                                                <Button variant="primary" size="sm">
                                                    Grade
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
