'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Video, Calendar, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function ScheduleSessionPage() {
    const [formData, setFormData] = useState({
        course: '',
        title: '',
        type: 'live-session',
        date: '',
        time: '',
        duration: '60',
        meetingLink: '',
        description: '',
        maxAttendees: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Session "${formData.title}" scheduled successfully!\n\nDetails:\n- Course: ${formData.course}\n- Date: ${formData.date}\n- Time: ${formData.time}\n- Duration: ${formData.duration} minutes\n- Type: ${formData.type}`);
        // Reset form
        setFormData({
            course: '',
            title: '',
            type: 'live-session',
            date: '',
            time: '',
            duration: '60',
            meetingLink: '',
            description: '',
            maxAttendees: '',
        });
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/lecturer/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Dashboard
                    </Button>
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Schedule Session</h1>
                    <p className="text-gray-400">Create a new live session or workshop for your students</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Session Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Course Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Select Course *
                                </label>
                                <select
                                    required
                                    value={formData.course}
                                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="">Choose a course...</option>
                                    <option value="CS 601">CS 601 - Machine Learning Fundamentals</option>
                                    <option value="CS 605">CS 605 - Data Science Masterclass</option>
                                    <option value="CS 603">CS 603 - Advanced Algorithms</option>
                                </select>
                            </div>

                            {/* Session Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Session Type *
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'live-session', label: 'Live Class', icon: '🎓' },
                                        { value: 'workshop', label: 'Workshop', icon: '🛠️' },
                                        { value: 'office-hours', label: 'Office Hours', icon: '💬' },
                                    ].map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: type.value })}
                                            className={`p-3 rounded-lg border-2 transition-smooth ${formData.type === type.value
                                                    ? 'border-primary-500 bg-primary-500/20'
                                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{type.icon}</div>
                                            <div className="text-sm font-medium text-white">{type.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Session Title */}
                            <Input
                                label="Session Title *"
                                type="text"
                                placeholder="e.g., Neural Networks Deep Dive"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />

                            {/* Date and Time */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <Input
                                    label="Duration (minutes) *"
                                    type="number"
                                    placeholder="60"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Meeting Link */}
                            <Input
                                label="Meeting Link *"
                                type="url"
                                placeholder="https://zoom.us/j/123456789 or Google Meet link"
                                value={formData.meetingLink}
                                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                                icon={<Video className="w-5 h-5" />}
                                required
                            />

                            {/* Max Attendees */}
                            <Input
                                label="Maximum Attendees (Optional)"
                                type="number"
                                placeholder="Leave empty for unlimited"
                                value={formData.maxAttendees}
                                onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                                icon={<Users className="w-5 h-5" />}
                            />

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="What will you cover in this session?"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-6">
                        <Link href="/lecturer/dashboard" className="flex-1">
                            <Button variant="ghost" className="w-full">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" variant="primary" className="flex-1">
                            <Calendar className="w-4 h-4" />
                            Schedule Session
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
