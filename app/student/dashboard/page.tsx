'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import {
    BookOpen,
    Clock,
    TrendingUp,
    Award,
    Calendar,
    Bell,
    Video,
    FileText,
    Users,
    GraduationCap,
    Play,
} from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
    const [userName, setUserName] = useState('Student');

    useEffect(() => {
        // Get user data from localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setUserName(user.name || 'Student');
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);
    // Mock data
    const student = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'JD',
        role: 'Master\'s Student',
    };

    const enrolledCourses = [
        {
            id: '1',
            title: 'Machine Learning Fundamentals',
            code: 'CS 601',
            progress: 65,
            thumbnail: '/api/placeholder/400/200',
            nextLesson: 'Neural Networks Introduction',
            dueDate: '2025-12-15',
            lecturer: 'Dr. Sarah Johnson',
        },
        {
            id: '2',
            title: 'Advanced Databases',
            code: 'CS 602',
            progress: 30,
            thumbnail: '/api/placeholder/400/200',
            nextLesson: 'Query Optimization',
            dueDate: '2025-12-18',
            lecturer: 'Prof. Michael Chen',
        },
        {
            id: '3',
            title: 'Business Strategy',
            code: 'MBA 550',
            progress: 85,
            thumbnail: '/api/placeholder/400/200',
            nextLesson: 'Final Project Presentation',
            dueDate: '2025-12-20',
            lecturer: 'Dr. Emily Rodriguez',
        },
    ];

    const upcomingEvents = [
        {
            id: '1',
            type: 'live-session',
            title: 'Machine Learning Live Class',
            date: '2025-12-12',
            time: '14:00',
            course: 'CS 601',
        },
        {
            id: '2',
            type: 'assignment',
            title: 'Database Design Assignment',
            date: '2025-12-14',
            time: '23:59',
            course: 'CS 602',
        },
        {
            id: '3',
            type: 'quiz',
            title: 'Strategy Quiz - Chapter 5',
            date: '2025-12-16',
            time: '18:00',
            course: 'MBA 550',
        },
    ];

    const stats = {
        coursesEnrolled: 3,
        coursesCompleted: 8,
        totalHours: 156,
        currentGPA: 3.75,
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                Welcome back, <span className="text-gradient-primary">{userName.split(' ')[0]}</span>!
                            </h1>
                            <p className="text-gray-400">Ready to continue your learning journey?</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                                {student.avatar}
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
                        { label: 'Courses Enrolled', value: stats.coursesEnrolled, icon: BookOpen, color: 'from-primary-400 to-primary-600' },
                        { label: 'Courses Completed', value: stats.coursesCompleted, icon: Award, color: 'from-secondary-500 to-secondary-700' },
                        { label: 'Learning Hours', value: stats.totalHours, icon: Clock, color: 'from-primary-300 to-primary-500' },
                        { label: 'Current GPA', value: stats.currentGPA.toFixed(2), icon: TrendingUp, color: 'from-secondary-400 to-secondary-600' },
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
                    {/* Main Content - Current Courses */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Current Courses</h2>
                            <Link href="/courses">
                                <Button variant="ghost" size="sm">View All</Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {enrolledCourses.map((course, index) => (
                                <Card key={course.id} className="hover:shadow-glow animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="flex flex-col md:flex-row gap-6 p-6">
                                        {/* Course Thumbnail */}
                                        <div className="w-full md:w-48 h-32 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center flex-shrink-0">
                                            <GraduationCap className="w-16 h-16 text-primary-400" />
                                        </div>

                                        {/* Course Details */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <Badge variant="info" className="mb-2">{course.code}</Badge>
                                                        <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                                                        <p className="text-sm text-gray-400">by {course.lecturer}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Due: {course.dueDate}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Play className="w-4 h-4" />
                                                        <span>Next: {course.nextLesson}</span>
                                                    </div>
                                                </div>

                                                <Progress value={course.progress} variant="gradient" />
                                            </div>

                                            <div className="flex gap-3">
                                                <Link href={`/student/course/${course.id}`} className="flex-1">
                                                    <Button variant="primary" size="sm" className="w-full">
                                                        Continue Learning
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="sm">
                                                    <FileText className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <Link href="/courses">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BookOpen className="w-5 h-5" />
                                            Browse Courses
                                        </Button>
                                    </Link>
                                    <Link href="/student/certificates">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <Award className="w-5 h-5" />
                                            My Certificates
                                        </Button>
                                    </Link>
                                    <Link href="/student/transcript">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <FileText className="w-5 h-5" />
                                            View Transcript
                                        </Button>
                                    </Link>
                                    <Link href="/student/profile">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <Users className="w-5 h-5" />
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Upcoming Events & Notifications */}
                    <div className="space-y-6">
                        {/* Upcoming Events */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Upcoming Events
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-smooth">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${event.type === 'live-session' ? 'bg-gradient-to-br from-primary-400 to-primary-600' :
                                            event.type === 'assignment' ? 'bg-gradient-to-br from-secondary-500 to-secondary-700' :
                                                'bg-gradient-to-br from-secondary-300 to-secondary-500'
                                            }`}>
                                            {event.type === 'live-session' && <Play className="w-5 h-5 text-white" />}
                                            {event.type === 'assignment' && <FileText className="w-5 h-5 text-white" />}
                                            {event.type === 'quiz' && <BookOpen className="w-5 h-5 text-white" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-white truncate">{event.title}</h4>
                                            <p className="text-xs text-gray-400">{event.course}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {event.date} at {event.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full" size="sm">
                                    View All Events
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Notifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="w-5 h-5" />
                                    Recent Notifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { text: 'New assignment posted in CS 601', time: '2 hours ago', variant: 'info' },
                                    { text: 'Grade available for MBA 550 Quiz', time: '5 hours ago', variant: 'success' },
                                    { text: 'Reminder: Live session tomorrow', time: '1 day ago', variant: 'warning' },
                                ].map((notification, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                                        <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-sm text-white">{notification.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full" size="sm">
                                    View All Notifications
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Progress Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>This Week's Progress</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Lessons Completed</span>
                                        <span className="text-white font-semibold">12/15</span>
                                    </div>
                                    <Progress value={80} variant="success" showLabel={false} />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Assignments Submitted</span>
                                        <span className="text-white font-semibold">3/4</span>
                                    </div>
                                    <Progress value={75} variant="gradient" showLabel={false} />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Study Hours</span>
                                        <span className="text-white font-semibold">18/20</span>
                                    </div>
                                    <Progress value={90} variant="warning" showLabel={false} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
