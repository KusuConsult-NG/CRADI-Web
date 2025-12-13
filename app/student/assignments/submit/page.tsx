'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Upload, FileText, Send } from 'lucide-react';
import Link from 'next/link';

export default function SubmitAssignmentPage() {
    const [formData, setFormData] = useState({
        comments: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const assignment = {
        title: 'Neural Networks Implementation',
        course: 'CS 601 - Machine Learning Fundamentals',
        dueDate: '2025-12-20 23:59',
        maxScore: 100,
        description: 'Implement a basic neural network from scratch using NumPy. Your implementation should include forward propagation, backpropagation, and gradient descent optimization.',
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert(`Assignment submitted successfully!\n\n"${assignment.title}"\n\nYou'll be notified once it's graded.`);
            setIsSubmitting(false);
            setFormData({ comments: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/student/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Dashboard
                    </Button>
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Submit Assignment</h1>
                    <p className="text-gray-400">{assignment.course}</p>
                </div>

                <div className="space-y-6">
                    {/* Assignment Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{assignment.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-400">Due Date:</span>
                                    <span className="text-white font-semibold ml-2">{assignment.dueDate}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Max Score:</span>
                                    <span className="text-white font-semibold ml-2">{assignment.maxScore} points</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-white/5">
                                <p className="text-gray-300">{assignment.description}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submission Form */}
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Submission</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Upload Your Work *
                                    </label>
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary-500/50 transition-smooth cursor-pointer">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-sm text-gray-400 mb-1">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500">PDF, DOCX, ZIP, Python files (max 50MB)</p>
                                    </div>
                                </div>

                                {/* Comments */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Comments (Optional)
                                    </label>
                                    <textarea
                                        value={formData.comments}
                                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                        placeholder="Add any notes or comments for your instructor..."
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Submission Info */}
                                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <p className="text-sm text-blue-300">
                                        ℹ️ Make sure to review your work before submitting. You can resubmit before the deadline if needed.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <Link href="/student/dashboard" className="flex-1">
                                <Button variant="ghost" className="w-full">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" variant="primary" className="flex-1" isLoading={isSubmitting}>
                                <Send className="w-4 h-4" />
                                Submit Assignment
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
