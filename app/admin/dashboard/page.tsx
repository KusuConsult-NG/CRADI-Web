'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
    Users,
    BookOpen,
    DollarSign,
    TrendingUp,
    FileText,
    UserPlus,
    AlertCircle,
    CheckCircle,
    XCircle,
    BarChart3,
    Calendar,
    Award,
    Settings,
    Download,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    // Mock data
    const [admin, setAdmin] = useState({
        name: 'Admin User',
        email: 'admin@cradi.edu',
        role: 'Institute Lead',
        avatar: 'AD',
    });

    useEffect(() => {
        // Load user data from localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                const nameParts = user.name?.split(' ') || ['Admin', 'User'];
                const initials = nameParts.map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

                setAdmin({
                    name: user.name || 'Admin User',
                    email: user.email || 'admin@cradi.edu',
                    role: user.role === 'ADMIN' ? 'Institute Lead' : 'Administrator',
                    avatar: initials,
                });
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        }
    }, []);

    const keyMetrics = {
        totalStudents: 2458,
        totalCourses: 87,
        monthlyRevenue: 145000,
        activeEnrollments: 3842,
        pendingApplications: 23,
        completionRate: 87,
        growthRate: 15,
        avgGPA: 3.42,
    };

    const pendingApplications = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            programme: 'MSc Computer Science',
            gpa: 3.8,
            submittedDate: '2025-12-10',
            status: 'under_review',
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            programme: 'MBA',
            gpa: 3.9,
            submittedDate: '2025-12-09',
            status: 'pending_documents',
        },
        {
            id: '3',
            name: 'Michael Chen',
            email: 'michael.chen@example.com',
            programme: 'MSc Data Science',
            gpa: 3.7,
            submittedDate: '2025-12-11',
            status: 'under_review',
        },
    ];

    const recentActivities = [
        { type: 'enrollment', text: '15 new enrollments in CS 601', time: '2 hours ago', icon: UserPlus },
        { type: 'application', text: '5 new applications received', time: '4 hours ago', icon: FileText },
        { type: 'payment', text: '$12,500 revenue today', time: '6 hours ago', icon: DollarSign },
        { type: 'completion', text: '8 students completed MBA 550', time: '1 day ago', icon: Award },
    ];

    const enrollmentTrends = [
        { month: 'Jul', enrollments: 320 },
        { month: 'Aug', enrollments: 385 },
        { month: 'Sep', enrollments: 412 },
        { month: 'Oct', enrollments: 468 },
        { month: 'Nov', enrollments: 523 },
        { month: 'Dec', enrollments: 589 },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in-up">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                <span className="text-gradient-primary">Admin</span> Dashboard
                            </h1>
                            <p className="text-gray-400">{admin.role} • {admin.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                                Export Report
                            </Button>
                            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                                {admin.avatar}
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

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Students', value: keyMetrics.totalStudents.toLocaleString(), icon: Users, color: 'from-primary-400 to-primary-600', change: '+12%' },
                        { label: 'Active Courses', value: keyMetrics.totalCourses, icon: BookOpen, color: 'from-secondary-500 to-secondary-700', change: '+5' },
                        { label: 'Monthly Revenue', value: `$${(keyMetrics.monthlyRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'from-primary-500 to-primary-700', change: '+18%' },
                        { label: 'Enrollments', value: keyMetrics.activeEnrollments.toLocaleString(), icon: TrendingUp, color: 'from-secondary-400 to-secondary-600', change: '+15%' },
                    ].map((metric, index) => (
                        <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                                        <metric.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <Badge variant="success" className="text-xs">{metric.change}</Badge>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                                <div className="text-sm text-gray-400">{metric.label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Secondary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Pending Applications', value: keyMetrics.pendingApplications, icon: AlertCircle, color: 'text-yellow-400' },
                        { label: 'Completion Rate', value: `${keyMetrics.completionRate}%`, icon: CheckCircle, color: 'text-green-400' },
                        { label: 'Growth Rate', value: `+${keyMetrics.growthRate}%`, icon: TrendingUp, color: 'text-blue-400' },
                        { label: 'Average GPA', value: keyMetrics.avgGPA, icon: Award, color: 'text-purple-400' },
                    ].map((stat, index) => (
                        <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${(index + 4) * 0.1}s` }}>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                    <div>
                                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                                        <div className="text-xs text-gray-400">{stat.label}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Pending Applications */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Pending Applications ({pendingApplications.length})
                                    </CardTitle>
                                    <Link href="/admin/applications">
                                        <Button variant="ghost" size="sm">View All</Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {pendingApplications.map((app) => (
                                        <div key={app.id} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-smooth">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className="font-semibold text-white mb-1">{app.name}</h4>
                                                    <p className="text-sm text-gray-400">{app.email}</p>
                                                </div>
                                                <Badge variant={app.status === 'under_review' ? 'warning' : 'info'}>
                                                    {app.status === 'under_review' ? 'Under Review' : 'Pending Docs'}
                                                </Badge>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Programme:</span>
                                                    <p className="text-white font-medium">{app.programme}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">GPA:</span>
                                                    <p className="text-white font-medium">{app.gpa}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Submitted:</span>
                                                    <p className="text-white font-medium">{app.submittedDate}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => alert(`Application approved for ${app.name}!\n\nStudent will be notified via email at ${app.email}`)}
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => alert(`Viewing details for ${app.name}:\n\nProgram: ${app.programme}\nGPA: ${app.gpa}\nEmail: ${app.email}\nStatus: ${app.status}`)}
                                                >
                                                    View Details
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (confirm(`Are you sure you want to reject ${app.name}'s application?`)) {
                                                            alert(`Application rejected for ${app.name}\n\nRejection email will be sent to ${app.email}`);
                                                        }
                                                    }}
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Enrollment Trends Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5" />
                                    Enrollment Trends
                                </CardTitle>
                                <CardDescription>Last 6 months enrollment growth</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-end justify-between gap-2">
                                    {enrollmentTrends.map((data, index) => {
                                        const maxHeight = Math.max(...enrollmentTrends.map(d => d.enrollments));
                                        const height = (data.enrollments / maxHeight) * 100;
                                        return (
                                            <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                                <div className="text-sm font-semibold text-white">{data.enrollments}</div>
                                                <div
                                                    className="w-full bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t-lg transition-all duration-500 hover:opacity-80"
                                                    style={{ height: `${height}%` }}
                                                />
                                                <div className="text-xs text-gray-400">{data.month}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link href="/admin/users">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <Users className="w-5 h-5" />
                                            Manage Users
                                        </Button>
                                    </Link>
                                    <Link href="/admin/courses">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BookOpen className="w-5 h-5" />
                                            Manage Courses
                                        </Button>
                                    </Link>
                                    <Link href="/admin/waiver-codes">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <Award className="w-5 h-5" />
                                            Waiver Codes
                                        </Button>
                                    </Link>
                                    <Link href="/admin/reports">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BarChart3 className="w-5 h-5" />
                                            Generate Reports
                                        </Button>
                                    </Link>
                                    <Link href="/admin/settings">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <Settings className="w-5 h-5" />
                                            System Settings
                                        </Button>
                                    </Link>
                                    <Link href="/admin/calendar">
                                        <Button variant="ghost" className="w-full justify-start">
                                            <Calendar className="w-5 h-5" />
                                            Academic Calendar
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.type === 'enrollment' ? 'bg-blue-500/20' :
                                            activity.type === 'application' ? 'bg-purple-500/20' :
                                                activity.type === 'payment' ? 'bg-green-500/20' :
                                                    'bg-orange-500/20'
                                            }`}>
                                            <activity.icon className={`w-5 h-5 ${activity.type === 'enrollment' ? 'text-blue-400' :
                                                activity.type === 'application' ? 'text-purple-400' :
                                                    activity.type === 'payment' ? 'text-green-400' :
                                                        'text-orange-400'
                                                }`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white">{activity.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    variant="ghost"
                                    className="w-full"
                                    size="sm"
                                    onClick={() => alert('Activity Log:\n\nShowing all system activities and audit trail.\n\nThis would typically open a detailed activity log page.')}
                                >
                                    View All Activity
                                </Button>
                            </CardContent>
                        </Card>

                        {/* System Health */}
                        <Card>
                            <CardHeader>
                                <CardTitle>System Health</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { label: 'Server Status', value: 'Online', status: 'success' },
                                    { label: 'Database', value: 'Healthy', status: 'success' },
                                    { label: 'API Response', value: '45ms', status: 'success' },
                                    { label: 'Storage Used', value: '68%', status: 'warning' },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">{item.label}</span>
                                        <Badge variant={item.status === 'success' ? 'success' : 'warning'}>
                                            {item.value}
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Top Courses */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Courses</CardTitle>
                                <CardDescription>By enrollment this month</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[
                                    { name: 'Machine Learning', enrollments: 145, change: '+23%' },
                                    { name: 'Web Development', enrollments: 132, change: '+18%' },
                                    { name: 'Business Strategy', enrollments: 98, change: '+12%' },
                                ].map((course, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white font-medium">{course.name}</span>
                                            <Badge variant="success" className="text-xs">{course.change}</Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                                                    style={{ width: `${(course.enrollments / 150) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-400">{course.enrollments}</span>
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
