'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Send, Bell } from 'lucide-react';
import Link from 'next/link';

export default function CreateAnnouncementPage() {
    const [formData, setFormData] = useState({
        course: '',
        title: '',
        message: '',
        priority: 'normal',
        sendEmail: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Announcement "${formData.title}" posted successfully!\n\nCourse: ${formData.course}\nPriority: ${formData.priority.toUpperCase()}\nEmail Notification: ${formData.sendEmail ? 'Sent' : 'Not sent'}`);
        // Reset form
        setFormData({
            course: '',
            title: '',
            message: '',
            priority: 'normal',
            sendEmail: true,
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
                    <h1 className="text-4xl font-bold text-white mb-2">Post Announcement</h1>
                    <p className="text-gray-400">Share important updates with your students</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Announcement Details</CardTitle>
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
                                    <option value="all">All My Courses</option>
                                </select>
                            </div>

                            {/* Title */}
                            <Input
                                label="Announcement Title *"
                                type="text"
                                placeholder="e.g., Class Cancelled - Rescheduled to Friday"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Write your announcement message here..."
                                    rows={8}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Priority Level
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['low', 'normal', 'high'].map((priority) => (
                                        <button
                                            key={priority}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, priority })}
                                            className={`p-3 rounded-lg border-2 transition-smooth capitalize ${formData.priority === priority
                                                    ? 'border-primary-500 bg-primary-500/20'
                                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            {priority === 'low' && '📝'}
                                            {priority === 'normal' && '📢'}
                                            {priority === 'high' && '⚠️'}
                                            <div className="text-sm font-medium text-white mt-1">{priority}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Send Email Notification */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="sendEmail"
                                    checked={formData.sendEmail}
                                    onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary-500 focus:ring-2 focus:ring-primary-500"
                                />
                                <label htmlFor="sendEmail" className="text-sm text-gray-300">
                                    Send email notification to all students
                                </label>
                            </div>

                            {/* Preview */}
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bell className="w-4 h-4 text-primary-400" />
                                    <span className="text-xs text-gray-400">Preview</span>
                                </div>
                                <h3 className="font-bold text-white mb-2">{formData.title || 'Your title here'}</h3>
                                <p className="text-sm text-gray-300 whitespace-pre-wrap">{formData.message || 'Your message will appear here...'}</p>
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
                            <Send className="w-4 h-4" />
                            Post Announcement
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
