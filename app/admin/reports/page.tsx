'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';
import Link from 'next/link';

export default function ReportsPage() {
    const reports = [
        { id: '1', name: 'Enrollment Report', description: 'Monthly enrollment statistics and trends', lastGenerated: '2025-12-11' },
        { id: '2', name: 'Revenue Report', description: 'Financial overview and payment analytics', lastGenerated: '2025-12-10' },
        { id: '3', name: 'Student Performance', description: 'Academic performance and completion rates', lastGenerated: '2025-12-09' },
        { id: '4', name: 'Course Analytics', description: 'Course engagement and feedback analysis', lastGenerated: '2025-12-08' },
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
                    <h1 className="text-4xl font-bold text-white mb-2">Reports</h1>
                    <p className="text-gray-400">Generate and download system reports</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {reports.map((report) => (
                        <Card key={report.id}>
                            <CardHeader>
                                <CardTitle>{report.name}</CardTitle>
                                <p className="text-sm text-gray-400">{report.description}</p>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Last: {report.lastGenerated}</span>
                                    <Button variant="primary" size="sm">
                                        <Download className="w-4 h-4" />
                                        Generate
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
