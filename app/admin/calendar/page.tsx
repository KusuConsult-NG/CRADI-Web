'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CalendarPage() {
    const events = [
        { id: '1', title: 'Fall Semester Begins', date: '2025-09-01', type: 'semester' },
        { id: '2', title: 'Mid-term Exams', date: '2025-10-15', type: 'exam' },
        { id: '3', title: 'Winter Break', date: '2025-12-20', type: 'holiday' },
        { id: '4', title: 'Spring Semester Begins', date: '2026-01-15', type: 'semester' },
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
                        <h1 className="text-4xl font-bold text-white mb-2">Academic Calendar</h1>
                        <p className="text-gray-400">Manage important academic dates and events</p>
                    </div>
                    <Button variant="primary">
                        <Plus className="w-4 h-4" />
                        Add Event
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {events.map((event) => (
                            <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                                        <CalendarIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{event.title}</h4>
                                        <p className="text-sm text-gray-400">{event.date}</p>
                                    </div>
                                </div>
                                <Badge variant={event.type === 'semester' ? 'info' : event.type === 'exam' ? 'warning' : 'success'}>
                                    {event.type}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
