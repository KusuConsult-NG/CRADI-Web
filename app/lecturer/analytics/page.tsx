'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { TrendingUp, TrendingDown, Users, BookOpen, Award, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsPage() {
    const [selectedCourse, setSelectedCourse] = useState('CS 601');
    const [timeRange, setTimeRange] = useState('week');

    const courses = [
        { id: 'CS 601', title: 'Machine Learning Fundamentals' },
        { id: 'CS 605', title: 'Data Science Masterclass' },
        { id: 'CS 603', title: 'Advanced Algorithms' },
    ];

    const stats = [
        { label: 'Active Students', value: 45, change: '+12%', trend: 'up', icon: Users, color: 'from-primary-400 to-primary-600' },
        { label: 'Avg. Completion', value: '78%', change: '+5%', trend: 'up', icon: BookOpen, color: 'from-primary-500 to-primary-700' },
        { label: 'Avg. Grade', value: '85%', change: '-2%', trend: 'down', icon: Award, color: 'from-secondary-500 to-secondary-700' },
        { label: 'Study Hours/Week', value: '12.5', change: '+3.2', trend: 'up', icon: Clock, color: 'from-secondary-400 to-secondary-600' },
    ];

    const studentPerformance = [
        { name: 'Alice Johnson', grade: 92, progress: 95, assignments: '12/12', status: 'excellent' },
        { name: 'Bob Smith', grade: 78, progress: 80, assignments: '11/12', status: 'good' },
        { name: 'Carol Williams', grade: 95, progress: 97, assignments: '12/12', status: 'excellent' },
        { name: 'David Brown', grade: 68, progress: 65, assignments: '9/12', status: 'needs-attention' },
        { name: 'Emma Davis', grade: 88, progress: 90, assignments: '12/12', status: 'good' },
    ];

    const moduleCompletion = [
        { module: 'Introduction to ML', completion: 95 },
        { module: 'Supervised Learning', completion: 85 },
        { module: 'Neural Networks', completion: 62 },
        { module: 'Deep Learning', completion: 40 },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/lecturer/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Dashboard
                    </Button>
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
                        <p className="text-gray-400">Track student performance and course metrics</p>
                    </div>
                    <Button variant="primary">
                        Export Report
                    </Button>
                </div>

                {/* Filters */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Course</label>
                                <select
                                    value={selectedCourse}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>{course.id} - {course.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Time Range</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['week', 'month', 'semester', 'year'].map((range) => (
                                        <button
                                            key={range}
                                            type="button"
                                            onClick={() => setTimeRange(range)}
                                            className={`px-4 py-3 rounded-lg border-2 transition-smooth capitalize ${timeRange === range
                                                ? 'border-primary-500 bg-primary-500/20 text-white'
                                                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <Card key={index}>
                            <CardContent className="p-6">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                    <div className={`flex items-center text-xs font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                                        {stat.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                        {stat.change}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Student Performance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {studentPerformance.map((student, index) => (
                                <div key={index} className="p-4 rounded-lg bg-white/5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-semibold text-white">{student.name}</h4>
                                            <p className="text-xs text-gray-400">Assignments: {student.assignments}</p>
                                        </div>
                                        <Badge variant={student.status === 'excellent' ? 'success' : student.status === 'good' ? 'info' : 'warning'}>
                                            {student.status === 'excellent' ? 'Excellent' : student.status === 'good' ? 'Good' : 'Needs Attention'}
                                        </Badge>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-400">Grade</span>
                                                <span className="text-white font-semibold">{student.grade}%</span>
                                            </div>
                                            <Progress value={student.grade} variant={student.grade >= 85 ? 'success' : student.grade >= 70 ? 'gradient' : 'warning'} showLabel={false} />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-400">Progress</span>
                                                <span className="text-white font-semibold">{student.progress}%</span>
                                            </div>
                                            <Progress value={student.progress} variant="gradient" showLabel={false} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Module Completion */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Module Completion Rates</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {moduleCompletion.map((module, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white font-medium">{module.module}</span>
                                        <span className="text-gray-400">{module.completion}%</span>
                                    </div>
                                    <Progress value={module.completion} variant={module.completion >= 80 ? 'success' : module.completion >= 60 ? 'gradient' : 'warning'} showLabel={false} />
                                </div>
                            ))}

                            <div className="pt-4 border-t border-white/10">
                                <h4 className="font-semibold text-white mb-4">Engagement Metrics</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-400">Avg. Video Completion</span>
                                        <span className="text-sm font-semibold text-white">82%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-400">Forum Participation</span>
                                        <span className="text-sm font-semibold text-white">67%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-400">On-Time Submissions</span>
                                        <span className="text-sm font-semibold text-white">91%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
