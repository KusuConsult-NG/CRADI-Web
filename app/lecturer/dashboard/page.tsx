'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
    Users,
    BookOpen,
    TrendingUp,
    FileText,
    Bell,
    Calendar,
    Award,
    Settings,
    CheckCircle,
    Clock,
    MessageSquare,
    AlertCircle,
    Video,
    BarChart3,
} from 'lucide-react';
import Link from 'next/link';

export default function LecturerDashboard() {
    const [lecturer, setLecturer] = useState({
        name: 'Lecturer',
        email: 'lecturer@cradi.edu',
        department: 'Computer Science',
        role: 'Lecturer',
        avatar: 'L',
    });

    useEffect(() => {
        // Get user data from localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                const initials = user.name ? user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'L';
                setLecturer({
                    name: user.name || 'Lecturer',
                    email: user.email || 'lecturer@cradi.edu',
                    department: user.department || 'Computer Science',
                    role: user.role === 'LECTURER' ? 'Lecturer' : user.role === 'ADMIN' ? 'Admin' : 'Lecturer',
                    avatar: initials,
                });
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    // Mock data
    const myCourses = [
        {
            id: '1',
            title: 'Machine Learning Fundamentals',
            code: 'CS 601',
            students: 45,
            pendingGrades: 12,
            nextSession: '2025-12-13 14:00',
            averageGrade: 85,
            completionRate: 78,
        },
        {
            id: '2',
            title: 'Data Science Masterclass',
            code: 'CS 605',
            students: 38,
            pendingGrades: 5,
            nextSession: '2025-12-14 10:00',
            averageGrade: 88,
            completionRate: 82,
        },
        {
            id: '3',
            title: 'Advanced Algorithms',
            code: 'CS 603',
            students: 52,
            pendingGrades: 0,
            nextSession: '2025-12-15 16:00',
            averageGrade: 82,
            completionRate: 75,
        },
    ];

    const pendingTasks = [
        {
            id: '1',
            type: 'assignment',
            title: 'Grade ML Assignment 3',
            course: 'CS 601',
            count: 12,
            dueDate: '2025-12-13',
            urgent: true,
        },
        {
            id: '2',
            type: 'quiz',
            title: 'Review Quiz Submissions',
            course: 'CS 605',
            count: 5,
            dueDate: '2025-12-14',
            urgent: false,
        },
        {
            id: '3',
            type: 'question',
            title: 'Unanswered Student Questions',
            course: 'CS 601',
            count: 8,
            dueDate: 'Today',
            urgent: true,
        },
    ];

    const upcomingSessions = [
        {
            id: '1',
            course: 'CS 601',
            title: 'Neural Networks Deep Dive',
            date: '2025-12-13',
            time: '14:00 - 16:00',
            type: 'Live Session',
            attendees: 42,
        },
        {
            id: '2',
            course: 'CS 605',
            title: 'Data Visualization Workshop',
            date: '2025-12-14',
            time: '10:00 - 12:00',
            type: 'Workshop',
            attendees: 35,
        },
    ];

    const stats = {
        totalStudents: 135,
        activeCourses: 3,
        avgClassPerformance: 85,
        pendingGrades: 17,
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                <span className="text-gradient-primary">Lecturer</span> Dashboard
                            </h1>
                            <p className="text-gray-400">Welcome back, {lecturer.name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-400">{lecturer.department}</p>
                                <p className="text-sm text-gray-500">{lecturer.email}</p>
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                                {lecturer.avatar}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('user');
                                    window.location.href = '/login';
                                }}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'from-primary-400 to-primary-600' },
                        { label: 'Active Courses', value: stats.activeCourses, icon: BookOpen, color: 'from-secondary-500 to-secondary-700' },
                        { label: 'Avg Performance', value: `${stats.avgClassPerformance}%`, icon: TrendingUp, color: 'from-primary-500 to-primary-700' },
                        { label: 'Pending Grades', value: stats.pendingGrades, icon: AlertCircle, color: 'from-secondary-400 to-secondary-600' },
                    ].map((stat, index) => (
                        <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <CardContent className="p-6">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* My Courses */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-white">My Courses</h2>
                                <Link href="/lecturer/courses">
                                    <Button variant="ghost" size="sm">View All</Button>
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {myCourses.map((course, index) => (
                                    <Card key={course.id} className="hover:shadow-glow animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <Badge variant="info" className="mb-2">{course.code}</Badge>
                                                    <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                                                    <p className="text-sm text-gray-400">
                                                        {course.students} students enrolled
                                                    </p>
                                                </div>
                                                {course.pendingGrades > 0 && (
                                                    <Badge variant="warning" dot>
                                                        {course.pendingGrades} pending
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                <div className="text-center p-3 rounded-lg bg-white/5">
                                                    <div className="text-2xl font-bold text-gradient-primary">{course.averageGrade}%</div>
                                                    <div className="text-xs text-gray-400">Avg Grade</div>
                                                </div>
                                                <div className="text-center p-3 rounded-lg bg-white/5">
                                                    <div className="text-2xl font-bold text-gradient-secondary">{course.completionRate}%</div>
                                                    <div className="text-xs text-gray-400">Completion</div>
                                                </div>
                                                <div className="text-center p-3 rounded-lg bg-white/5">
                                                    <div className="text-2xl font-bold text-green-400">{course.students}</div>
                                                    <div className="text-xs text-gray-400">Students</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                                <Calendar className="w-4 h-4" />
                                                <span>Next session: {course.nextSession}</span>
                                            </div>

                                            <div className="flex gap-3">
                                                <Link href={`/lecturer/courses/${course.id}`} className="flex-1">
                                                    <Button variant="primary" size="sm" className="w-full">
                                                        Manage Course
                                                    </Button>
                                                </Link>
                                                <Link href={`/lecturer/courses/${course.id}/grades`}>
                                                    <Button variant="ghost" size="sm">
                                                        <FileText className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="sm">
                                                    <BarChart3 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Pending Tasks */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-orange-400" />
                                    Pending Tasks
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {pendingTasks.map((task) => (
                                    <div key={task.id} className={`p-4 rounded-lg ${task.urgent ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5'}`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-white">{task.title}</h4>
                                                    {task.urgent && <Badge variant="danger" className="text-xs">Urgent</Badge>}
                                                </div>
                                                <p className="text-sm text-gray-400">{task.course}</p>
                                            </div>
                                            <Badge variant={task.type === 'assignment' ? 'warning' : 'info'}>
                                                {task.count} items
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                                            <Button variant="ghost" size="sm">
                                                Review Now
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Upcoming Sessions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Video className="w-5 h-5" />
                                    Upcoming Sessions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {upcomingSessions.map((session) => (
                                    <div key={session.id} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-smooth">
                                        <Badge variant="purple" className="mb-2">{session.course}</Badge>
                                        <h4 className="font-semibold text-white text-sm mb-2">{session.title}</h4>
                                        <div className="space-y-1 text-xs text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                <span>{session.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3 h-3" />
                                                <span>{session.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-3 h-3" />
                                                <span>{session.attendees} registered</span>
                                            </div>
                                        </div>
                                        <Button variant="primary" size="sm" className="w-full mt-3">
                                            Start Session
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href="/lecturer/assignments/create">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <FileText className="w-5 h-5" />
                                        Create Assignment
                                    </Button>
                                </Link>
                                <Link href="/lecturer/announcements/create">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <MessageSquare className="w-5 h-5" />
                                        Post Announcement
                                    </Button>
                                </Link>
                                <Link href="/lecturer/sessions/schedule">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Video className="w-5 h-5" />
                                        Schedule Session
                                    </Button>
                                </Link>
                                <Link href="/lecturer/analytics">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <BarChart3 className="w-5 h-5" />
                                        View Analytics
                                    </Button>
                                </Link>
                                <Link href="/lecturer/courses">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Settings className="w-5 h-5" />
                                        Course Settings
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { text: 'Updated CS 601 syllabus', time: '2 hours ago', icon: FileText },
                                    { text: '15 new submissions in CS 605', time: '5 hours ago', icon: CheckCircle },
                                    { text: 'Graded Assignment 2', time: '1 day ago', icon: FileText },
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                                            <activity.icon className="w-4 h-4 text-primary-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white">{activity.text}</p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
