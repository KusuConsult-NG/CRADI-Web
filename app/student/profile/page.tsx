'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { User, Mail, Phone, Camera, Save } from 'lucide-react';
import Link from 'next/link';

export default function StudentProfilePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        studentId: '',
        department: '',
        program: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Load user data from localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    studentId: user.studentId || '',
                    department: user.department || '',
                    program: 'Masters in Computer Science',
                });
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Update localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                const updatedUser = {
                    ...user,
                    name: formData.name,
                    phone: formData.phone,
                    department: formData.department,
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                alert('Profile updated successfully!');
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('Failed to update profile');
            }
        }
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
                    <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
                    <p className="text-gray-400">Manage your personal information and settings</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Picture Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center text-white text-5xl font-bold mx-auto mb-4">
                                    {formData.name ? formData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ST'}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{formData.name || 'Student Name'}</h3>
                                <Badge variant="info" className="mb-4">{formData.studentId || 'CRADI-2025-XXX'}</Badge>
                                <Button variant="ghost" className="w-full">
                                    <Camera className="w-4 h-4" />
                                    Change Photo
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Quick Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <p className="text-gray-400">Program</p>
                                    <p className="text-white font-semibold">{formData.program}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Department</p>
                                    <p className="text-white font-semibold">{formData.department || 'Not set'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Student ID</p>
                                    <p className="text-white font-semibold">{formData.studentId || 'N/A'}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Personal Information</CardTitle>
                                        {!isEditing ? (
                                            <Button type="button" variant="primary" onClick={() => setIsEditing(true)}>
                                                Edit Profile
                                            </Button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                                                    Cancel
                                                </Button>
                                                <Button type="submit" variant="primary">
                                                    <Save className="w-4 h-4" />
                                                    Save Changes
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <Input
                                        label="Full Name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        icon={<User className="w-5 h-5" />}
                                        disabled={!isEditing}
                                    />

                                    <Input
                                        label="Email Address"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        icon={<Mail className="w-5 h-5" />}
                                        disabled={true}
                                    />
                                    {!isEditing && <p className="text-xs text-gray-500 -mt-3">Email cannot be changed</p>}

                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        placeholder="+234 (800) 000-0000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        icon={<Phone className="w-5 h-5" />}
                                        disabled={!isEditing}
                                    />

                                    <Input
                                        label="Student ID"
                                        type="text"
                                        value={formData.studentId}
                                        disabled={true}
                                    />
                                    {!isEditing && <p className="text-xs text-gray-500 -mt-3">Student ID is auto-generated</p>}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Department
                                        </label>
                                        <select
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <option value="">Select Department...</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="Business Administration">Business Administration</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Data Science">Data Science</option>
                                        </select>
                                    </div>

                                    <Input
                                        label="Program"
                                        type="text"
                                        value={formData.program}
                                        disabled={true}
                                    />
                                    {!isEditing && <p className="text-xs text-gray-500 -mt-3">Program is set during enrollment</p>}
                                </CardContent>
                            </Card>
                        </form>

                        {/* Password Change Card */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Security</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button variant="ghost" className="w-full justify-start">
                                    Change Password
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
