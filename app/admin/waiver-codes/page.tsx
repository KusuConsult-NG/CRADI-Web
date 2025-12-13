'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Plus, Copy, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function WaiverCodesPage() {
    const waiverCodes = [
        { id: '1', code: 'SCHOLAR2025', discount: '100%', uses: 5, maxUses: 10, status: 'Active' },
        { id: '2', code: 'EARLYBIRD50', discount: '50%', uses: 23, maxUses: 50, status: 'Active' },
        { id: '3', code: 'ALUMNI25', discount: '25%', uses: 12, maxUses: 20, status: 'Active' },
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
                        <h1 className="text-4xl font-bold text-white mb-2">Waiver Codes</h1>
                        <p className="text-gray-400">Manage discount and waiver codes</p>
                    </div>
                    <Button variant="primary">
                        <Plus className="w-4 h-4" />
                        Create Code
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Waiver Codes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {waiverCodes.map((code) => (
                            <div key={code.id} className="p-4 rounded-lg bg-white/5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <code className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded font-mono">
                                            {code.code}
                                        </code>
                                        <Badge variant="success">{code.discount} OFF</Badge>
                                    </div>
                                    <Badge variant="info">{code.status}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-400">
                                        Used: {code.uses}/{code.maxUses}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm">
                                            <Copy className="w-4 h-4" />
                                            Copy
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Trash2 className="w-4 h-4 text-red-400" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
