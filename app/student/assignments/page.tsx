'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import {
    FileText,
    Calendar,
    Clock,
    CheckCircle,
    AlertCircle,
    Upload,
    Download,
} from 'lucide-react';
import Link from 'next/link';

export default function StudentAssignmentsPage() {
    const assignments = [
        {
            id: '1',
            title: 'Linear Regression Model',
            course: 'CS 601 - Machine Learning',
            dueDate: '2025-12-15',
            status: 'submitted',
            grade: 88,
            maxScore: 100,
            submittedDate: '2025-12-10',
        },
        {
            id: '2',
            title: 'Classification Project',
            course: 'CS 601 - Machine Learning',
            dueDate: '2025-12-20',
            status: 'pending',
            grade: null,
            maxScore: 100,
            submittedDate: null,
        },
        {
            id: '3',
            title: 'Neural Network Implementation',
            course: 'CS 601 - Machine Learning',
            dueDate: '2025-12-25',
            status: 'not_submitted',
            grade: null,
            maxScore: 100,
            submittedDate: null,
        },
        {
            id: '4',
            title: 'Data Analysis Report',
            course: 'CS 605 - Data Science',
            dueDate: '2025-12-18',
            status: 'graded',
            grade: 92,
            maxScore: 100,
            submittedDate: '2025-12-12',
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'graded':
                return <Badge variant="success">Graded</Badge>;
            case 'submitted':
                return <Badge variant="info">Submitted</Badge>;
            case 'pending':
                return <Badge variant="warning">Pending Review</Badge>;
            case 'not_submitted':
                return <Badge variant="danger">Not Submitted</Badge>;
            default:
                return <Badge variant="default">{status}</Badge>;
        }
    };

    const getDaysUntilDue = (dueDate: string) => {
        const due = new Date(dueDate);
        const now = new Date();
        const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/student/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Dashboard
                    </Button>
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">My Assignments</h1>
                    <p className="text-gray-400">Track and submit your course assignments</p>
                </div>

                {/* Stats Overview */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">4</div>
                                    <div className="text-sm text-gray-400">Total Assignments</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">2</div>
                                    <div className="text-sm text-gray-400">Completed</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-warm flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">1</div>
                                    <div className="text-sm text-gray-400">Pending Review</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">90%</div>
                                    <div className="text-sm text-gray-400">Avg. Grade</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Assignments List */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Assignments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {assignments.map((assignment) => {
                            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                            const isOverdue = daysUntilDue < 0 && assignment.status === 'not_submitted';

                            return (
                                <div
                                    key={assignment.id}
                                    className={`p-6 rounded-lg transition-smooth ${isOverdue ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-semibold text-white">{assignment.title}</h3>
                                                {getStatusBadge(assignment.status)}
                                            </div>
                                            <p className="text-sm text-gray-400 mb-1">{assignment.course}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Due: {assignment.dueDate}</span>
                                                </div>
                                                {daysUntilDue > 0 && assignment.status === 'not_submitted' && (
                                                    <div className="flex items-center gap-1 text-yellow-400">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{daysUntilDue} days left</span>
                                                    </div>
                                                )}
                                                {isOverdue && (
                                                    <div className="flex items-center gap-1 text-red-400">
                                                        <AlertCircle className="w-4 h-4" />
                                                        <span>Overdue by {Math.abs(daysUntilDue)} days</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {assignment.grade !== null && (
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-white">{assignment.grade}</div>
                                                <div className="text-sm text-gray-400">/{assignment.maxScore}</div>
                                            </div>
                                        )}
                                    </div>

                                    {assignment.grade !== null && (
                                        <div className="mb-4">
                                            <Progress
                                                value={(assignment.grade / assignment.maxScore) * 100}
                                                variant={assignment.grade >= 80 ? 'success' : 'warning'}
                                            />
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        {assignment.status === 'not_submitted' && (
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => alert(`Submit Assignment: ${assignment.title}\n\nUpload your work here.\n\nSupported formats: PDF, DOCX, ZIP`)}
                                            >
                                                <Upload className="w-4 h-4" />
                                                Submit Assignment
                                            </Button>
                                        )}
                                        {(assignment.status === 'submitted' || assignment.status === 'graded') && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    alert(
                                                        `View Submission: ${assignment.title}\n\nSubmitted: ${assignment.submittedDate}\n${assignment.grade ? `Grade: ${assignment.grade}/${assignment.maxScore}` : 'Awaiting grading'
                                                        }`
                                                    )
                                                }
                                            >
                                                <FileText className="w-4 h-4" />
                                                View Submission
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                alert(`Assignment Instructions:\n\n${assignment.title}\n\nDetailed instructions and requirements will be displayed here.`)
                                            }
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Instructions
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
