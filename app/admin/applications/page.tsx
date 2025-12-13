'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationsPage() {
    const applications = [
        { id: '1', name: 'John Doe', email: 'john@example.com', program: 'MSc Computer Science', gpa: 3.8, date: '2025-12-10', status: 'pending' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', program: 'MBA', gpa: 3.9, date: '2025-12-09', status: 'under_review' },
        { id: '3', name: 'Michael Chen', email: 'michael@example.com', program: 'MSc Data Science', gpa: 3.7, date: '2025-12-11', status: 'pending' },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/admin/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Dashboard
                    </Button>
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Applications</h1>
                    <p className="text-gray-400">Review and manage student applications</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Pending Applications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {applications.map((app) => (
                            <div key={app.id} className="p-4 rounded-lg bg-white/5">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">{app.name}</h4>
                                        <p className="text-sm text-gray-400">{app.email}</p>
                                    </div>
                                    <Badge variant={app.status === 'under_review' ? 'warning' : 'info'}>
                                        {app.status === 'under_review' ? 'Under Review' : 'Pending'}
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Program:</span>
                                        <p className="text-white font-medium">{app.program}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">GPA:</span>
                                        <p className="text-white font-medium">{app.gpa}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Submitted:</span>
                                        <p className="text-white font-medium">{app.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="primary" size="sm" className="flex-1">
                                        <CheckCircle className="w-4 h-4" />
                                        Approve
                                    </Button>
                                    <Button variant="ghost" size="sm" className="flex-1">
                                        <Eye className="w-4 h-4" />
                                        Review
                                    </Button>
                                    <Button variant="danger" size="sm">
                                        <XCircle className="w-4 h-4" />
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
