'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Search, UserPlus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ManageUsersPage() {
    const users = [
        { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'STUDENT', status: 'Active' },
        { id: '2', name: 'Dr. Sarah Lee', email: 'sarah@cradi.edu', role: 'LECTURER', status: 'Active' },
        { id: '3', name: 'Bob Smith', email: 'bob@example.com', role: 'STUDENT', status: 'Active' },
        { id: '4', name: 'Admin User', email: 'admin@cradi.edu', role: 'ADMIN', status: 'Active' },
    ];

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/admin/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Dashboard
                    </Button>
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Manage Users</h1>
                        <p className="text-gray-400">View and manage all system users</p>
                    </div>
                    <Button variant="primary">
                        <UserPlus className="w-4 h-4" />
                        Add User
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>All Users</CardTitle>
                            <Input
                                type="text"
                                placeholder="Search users..."
                                icon={<Search className="w-5 h-5" />}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {users.map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-smooth">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white">{user.name}</h4>
                                        <p className="text-sm text-gray-400">{user.email}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant={user.role === 'ADMIN' ? 'purple' : user.role === 'LECTURER' ? 'info' : 'success'}>
                                            {user.role}
                                        </Badge>
                                        <Badge variant="success">{user.status}</Badge>
                                        <Button variant="ghost" size="sm">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Trash2 className="w-4 h-4 text-red-400" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
