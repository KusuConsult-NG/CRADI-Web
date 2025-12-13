'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import {
    Users,
    BookOpen,
    FileText,
    Video,
    Settings,
    Calendar,
    Plus,
    Edit,
    Trash2,
    Download,
    Upload,
    MessageSquare,
    Search,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ManageCoursePage() {
    const params = useParams();
    const courseId = params?.id as string;

    const [showModuleForm, setShowModuleForm] = useState(false);
    const [editingModule, setEditingModule] = useState<any>(null);
    const [moduleFormData, setModuleFormData] = useState({
        title: '',
        lessons: '',
        status: 'Draft',
    });
    const [searchStudent, setSearchStudent] = useState('');
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [messageSubject, setMessageSubject] = useState('Course Update');

    // Mock course data
    const [course] = useState({
        id: courseId,
        title: 'Machine Learning Fundamentals',
        code: 'CS 601',
        description: 'A comprehensive introduction to machine learning concepts, algorithms, and applications.',
        students: 45,
        modules: 8,
        assignments: 12,
        averageGrade: 85,
        status: 'Active',
    });

    const [modules, setModules] = useState([
        { id: '1', title: 'Introduction to ML', lessons: 5, status: 'Published' },
        { id: '2', title: 'Supervised Learning', lessons: 8, status: 'Published' },
        { id: '3', title: 'Neural Networks', lessons: 6, status: 'Draft' },
    ]);

    const [students] = useState([
        { id: '1', name: 'Alice Johnson', email: 'alice@example.com', progress: 85, grade: 88, status: 'Active', studentId: 'CRADI-2025-001' },
        { id: '2', name: 'Bob Smith', email: 'bob@example.com', progress: 72, grade: 75, status: 'Active', studentId: 'CRADI-2025-002' },
        { id: '3', name: 'Carol Williams', email: 'carol@example.com', progress: 91, grade: 92, status: 'Active', studentId: 'CRADI-2025-003' },
        { id: '4', name: 'David Brown', email: 'david@example.com', progress: 65, grade: 70, status: 'Active', studentId: 'CRADI-2025-004' },
        { id: '5', name: 'Emma Davis', email: 'emma@example.com', progress: 88, grade: 86, status: 'Active', studentId: 'CRADI-2025-005' },
    ]);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
        student.email.toLowerCase().includes(searchStudent.toLowerCase())
    );

    const handleAddModule = () => {
        if (!moduleFormData.title || !moduleFormData.lessons) {
            alert('Please fill in all fields');
            return;
        }

        const newModule = {
            id: String(modules.length + 1),
            title: moduleFormData.title,
            lessons: parseInt(moduleFormData.lessons),
            status: moduleFormData.status,
        };

        setModules([...modules, newModule]);
        alert(`Module "${newModule.title}" created successfully!`);
        setModuleFormData({ title: '', lessons: '', status: 'Draft' });
        setShowModuleForm(false);
    };

    const handleEditModule = (module: any) => {
        setEditingModule(module);
        setModuleFormData({
            title: module.title,
            lessons: String(module.lessons),
            status: module.status,
        });
        setShowModuleForm(true);
    };

    const handleUpdateModule = () => {
        if (!editingModule) return;

        const updatedModules = modules.map(m =>
            m.id === editingModule.id
                ? { ...m, title: moduleFormData.title, lessons: parseInt(moduleFormData.lessons), status: moduleFormData.status }
                : m
        );

        setModules(updatedModules);
        alert(`Module "${moduleFormData.title}" updated successfully!`);
        setModuleFormData({ title: '', lessons: '', status: 'Draft' });
        setEditingModule(null);
        setShowModuleForm(false);
    };

    const handleDeleteModule = (moduleId: string) => {
        if (confirm('Are you sure you want to delete this module?')) {
            setModules(modules.filter(m => m.id !== moduleId));
            alert('Module deleted successfully!');
        }
    };

    const handleExportRoster = () => {
        alert('Student roster exported to CSV!\n\nFile: course_roster_CS601.csv');
    };

    const handleViewStudent = (student: any) => {
        setSelectedStudent(student);
    };

    const handleMessageStudent = (student: any) => {
        setSelectedStudent(student);
        setShowMessageModal(true);
    };

    const handleSendMessage = () => {
        if (!messageText.trim()) {
            alert('Please enter a message');
            return;
        }
        alert(`Message sent to ${selectedStudent?.name}!\n\n"${messageText}"`);
        setMessageText('');
        setMessageSubject('Course Update');
        setShowMessageModal(false);
        setSelectedStudent(null);
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/lecturer/dashboard">
                        <Button variant="ghost" size="sm" className="mb-4">
                            ← Back to Dashboard
                        </Button>
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <Badge variant="info" className="mb-2">{course.code}</Badge>
                            <h1 className="text-4xl font-bold text-white mb-2">{course.title}</h1>
                            <p className="text-gray-400">{course.description}</p>
                        </div>
                        <Link href="/lecturer/courses">
                            <Button variant="primary">
                                <Settings className="w-4 h-4" />
                                Course Settings
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Enrolled Students', value: course.students, icon: Users, color: 'from-primary-400 to-primary-600' },
                        { label: 'Course Modules', value: modules.length, icon: BookOpen, color: 'from-secondary-500 to-secondary-700' },
                        { label: 'Assignments', value: course.assignments, icon: FileText, color: 'from-secondary-400 to-secondary-600' },
                        { label: 'Average Grade', value: `${course.averageGrade}%`, icon: Users, color: 'from-primary-500 to-primary-700' },
                    ].map((stat, index) => (
                        <Card key={index}>
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
                        {/* Course Modules */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Course Modules</CardTitle>
                                    <Button variant="primary" size="sm" onClick={() => setShowModuleForm(true)}>
                                        <Plus className="w-4 h-4" />
                                        Add Module
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {/* Module Form */}
                                {showModuleForm && (
                                    <div className="p-4 rounded-lg bg-primary-500/10 border border-primary-500/20 space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-white">
                                                {editingModule ? 'Edit Module' : 'Add New Module'}
                                            </h4>
                                            <button
                                                onClick={() => {
                                                    setShowModuleForm(false);
                                                    setEditingModule(null);
                                                    setModuleFormData({ title: '', lessons: '', status: 'Draft' });
                                                }}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <Input
                                            label="Module Title"
                                            type="text"
                                            placeholder="e.g., Introduction to Neural Networks"
                                            value={moduleFormData.title}
                                            onChange={(e) => setModuleFormData({ ...moduleFormData, title: e.target.value })}
                                        />

                                        <Input
                                            label="Number of Lessons"
                                            type="number"
                                            placeholder="5"
                                            value={moduleFormData.lessons}
                                            onChange={(e) => setModuleFormData({ ...moduleFormData, lessons: e.target.value })}
                                        />

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['Draft', 'Published'].map((status) => (
                                                    <button
                                                        key={status}
                                                        type="button"
                                                        onClick={() => setModuleFormData({ ...moduleFormData, status })}
                                                        className={`p-2 rounded-lg border-2 transition-smooth ${moduleFormData.status === status
                                                            ? 'border-primary-500 bg-primary-500/20'
                                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                                            }`}
                                                    >
                                                        <span className="text-sm font-medium text-white">{status}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => {
                                                    setShowModuleForm(false);
                                                    setEditingModule(null);
                                                    setModuleFormData({ title: '', lessons: '', status: 'Draft' });
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="flex-1"
                                                onClick={editingModule ? handleUpdateModule : handleAddModule}
                                            >
                                                {editingModule ? 'Update' : 'Add'} Module
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Modules List */}
                                {modules.map((module) => (
                                    <div key={module.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-smooth">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                                                <BookOpen className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">{module.title}</h4>
                                                <p className="text-sm text-gray-400">{module.lessons} lessons</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={module.status === 'Published' ? 'success' : 'warning'}>
                                                {module.status}
                                            </Badge>
                                            <Button variant="ghost" size="sm" onClick={() => handleEditModule(module)}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDeleteModule(module.id)}>
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Student Roster */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Student Roster</CardTitle>
                                    <Button variant="ghost" size="sm" onClick={handleExportRoster}>
                                        <Download className="w-4 h-4" />
                                        Export
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Search */}
                                <div className="mb-4">
                                    <Input
                                        type="text"
                                        placeholder="Search students by name or email..."
                                        value={searchStudent}
                                        onChange={(e) => setSearchStudent(e.target.value)}
                                        icon={<Search className="w-5 h-5" />}
                                    />
                                </div>

                                <div className="space-y-3">
                                    {filteredStudents.map((student) => (
                                        <div key={student.id} className="p-3 rounded-lg bg-white/5">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-white">{student.name}</h4>
                                                    <p className="text-sm text-gray-400">{student.email}</p>
                                                </div>
                                                <Badge variant="success">{student.status}</Badge>
                                            </div>
                                            <div className="space-y-2 mb-3">
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-gray-400">Progress</span>
                                                        <span className="text-white font-semibold">{student.progress}%</span>
                                                    </div>
                                                    <Progress value={student.progress} variant="gradient" showLabel={false} />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-gray-400">Grade</span>
                                                        <span className="text-white font-semibold">{student.grade}%</span>
                                                    </div>
                                                    <Progress value={student.grade} variant={student.grade >= 80 ? 'success' : 'warning'} showLabel={false} />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleMessageStudent(student)}>
                                                    <MessageSquare className="w-4 h-4" />
                                                    Message
                                                </Button>
                                                <Button variant="primary" size="sm" className="flex-1" onClick={() => handleViewStudent(student)}>
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    {filteredStudents.length === 0 && (
                                        <div className="text-center py-8 text-gray-400">
                                            No students found matching "{searchStudent}"
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
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
                                <Link href="/lecturer/sessions/schedule">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Video className="w-5 h-5" />
                                        Schedule Session
                                    </Button>
                                </Link>
                                <Link href="/lecturer/announcements/create">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <MessageSquare className="w-5 h-5" />
                                        Post Announcement
                                    </Button>
                                </Link>
                                <Button variant="ghost" className="w-full justify-start">
                                    <Upload className="w-5 h-5" />
                                    Upload Materials
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Course Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <p className="text-gray-400">Course Code</p>
                                    <p className="text-white font-semibold">{course.code}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Status</p>
                                    <Badge variant="success">{course.status}</Badge>
                                </div>
                                <div>
                                    <p className="text-gray-400">Enrolled Students</p>
                                    <p className="text-white font-semibold">{course.students}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Average Grade</p>
                                    <p className="text-white font-semibold">{course.averageGrade}%</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Student Detail Modal */}
                {selectedStudent && !showMessageModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedStudent(null)}>
                        <Card className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Student Details</CardTitle>
                                    <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Student Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                                        {selectedStudent.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{selectedStudent.name}</h3>
                                        <p className="text-gray-400">{selectedStudent.email}</p>
                                        <Badge variant="info" className="mt-1">{selectedStudent.studentId}</Badge>
                                    </div>
                                </div>

                                {/* Performance Metrics */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-sm text-gray-400 mb-2">Course Progress</p>
                                        <div className="text-3xl font-bold text-white mb-2">{selectedStudent.progress}%</div>
                                        <Progress value={selectedStudent.progress} variant="gradient" showLabel={false} />
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5">
                                        <p className="text-sm text-gray-400 mb-2">Current Grade</p>
                                        <div className="text-3xl font-bold text-white mb-2">{selectedStudent.grade}%</div>
                                        <Progress value={selectedStudent.grade} variant={selectedStudent.grade >= 80 ? "success" : "warning"} showLabel={false} />
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-400">Status</p>
                                        <Badge variant="success">{selectedStudent.status}</Badge>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Course</p>
                                        <p className="text-white font-semibold">{course.code}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4 border-t border-white/10">
                                    <Button variant="primary" className="flex-1" onClick={() => {
                                        setShowMessageModal(true);
                                    }}>
                                        <MessageSquare className="w-4 h-4" />
                                        Send Message
                                    </Button>
                                    <Button variant="ghost" className="flex-1" onClick={() => setSelectedStudent(null)}>
                                        Close
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Message Modal */}
                {showMessageModal && selectedStudent && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => {
                        setShowMessageModal(false);
                        setSelectedStudent(null);
                        setMessageText('');
                    }}>
                        <Card className="max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Message {selectedStudent.name}</CardTitle>
                                    <button onClick={() => {
                                        setShowMessageModal(false);
                                        setSelectedStudent(null);
                                        setMessageText('');
                                    }} className="text-gray-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        To: {selectedStudent.email}
                                    </label>
                                    <Input
                                        label="Subject"
                                        type="text"
                                        placeholder="e.g., Regarding your recent assignment"
                                        value={messageSubject}
                                        onChange={(e) => setMessageSubject(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Type your message here..."
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="ghost" className="flex-1" onClick={() => {
                                        setShowMessageModal(false);
                                        setSelectedStudent(null);
                                        setMessageText('');
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" className="flex-1" onClick={handleSendMessage}>
                                        <MessageSquare className="w-4 h-4" />
                                        Send Message
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
