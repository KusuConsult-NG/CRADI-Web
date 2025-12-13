'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Upload, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';

export default function CreateAssignmentPage() {
    const [formData, setFormData] = useState({
        title: '',
        course: '',
        description: '',
        dueDate: '',
        maxScore: '100',
        allowLateSubmission: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Assignment "${formData.title}" created successfully!\n\nDetails:\n- Course: ${formData.course}\n- Due Date: ${formData.dueDate}\n- Max Score: ${formData.maxScore}\n- Late Submission: ${formData.allowLateSubmission ? 'Allowed' : 'Not Allowed'}`);
        // Reset form
        setFormData({
            title: '',
            course: '',
            description: '',
            dueDate: '',
            maxScore: '100',
            allowLateSubmission: false,
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
                    <h1 className="text-4xl font-bold text-white mb-2">Create Assignment</h1>
                    <p className="text-gray-400">Create a new assignment for your students</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Assignment Details</CardTitle>
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

                            {/* Assignment Title */}
                            <Input
                                label="Assignment Title *"
                                type="text"
                                placeholder="e.g., Neural Networks Implementation"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Provide detailed instructions for the assignment..."
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Due Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Due Date *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Max Score */}
                                <Input
                                    label="Maximum Score *"
                                    type="number"
                                    placeholder="100"
                                    value={formData.maxScore}
                                    onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Allow Late Submission */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="lateSubmission"
                                    checked={formData.allowLateSubmission}
                                    onChange={(e) => setFormData({ ...formData, allowLateSubmission: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary-500 focus:ring-2 focus:ring-primary-500"
                                />
                                <label htmlFor="lateSubmission" className="text-sm text-gray-300">
                                    Allow late submissions with penalty
                                </label>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Attach Resources (Optional)
                                </label>
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary-500/50 transition-smooth cursor-pointer">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-sm text-gray-400 mb-1">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-500">PDF, DOCX, ZIP (max 10MB)</p>
                                </div>
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
                            <FileText className="w-4 h-4" />
                            Create Assignment
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
