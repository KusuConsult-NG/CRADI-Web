'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Save } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/admin/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        ← Back to Dashboard
                    </Button>
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">System Settings</h1>
                    <p className="text-gray-400">Configure system-wide settings and preferences</p>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input label="Institution Name" type="text" value="CRADI Learning Management System" />
                            <Input label="Support Email" type="email" value="support@cradi.edu" />
                            <Input label="Contact Phone" type="tel" value="+234 800 000 0000" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Email Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input label="SMTP Server" type="text" value="smtp.gmail.com" />
                            <Input label="SMTP Port" type="number" value="587" />
                            <Input label="Sender Email" type="email" value="noreply@cradi.edu" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input label="Currency" type="text" value="NGN" />
                            <Input label="Payment Gateway" type="text" value="Paystack" />
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="autoEnroll" className="w-5 h-5 rounded" defaultChecked />
                                <label htmlFor="autoEnroll" className="text-sm text-gray-300">
                                    Auto-enroll students after payment
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button variant="primary">
                            <Save className="w-4 h-4" />
                            Save Settings
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
