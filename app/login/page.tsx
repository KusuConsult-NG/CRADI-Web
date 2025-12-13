'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { GraduationCap, Mail, Lock, Chrome } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Call real API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Login failed');
                setIsLoading(false);
                return;
            }

            // Store user data and token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect based on role
            if (data.user.role === 'LECTURER') {
                router.push('/lecturer/dashboard');
            } else if (data.user.role === 'ADMIN') {
                router.push('/admin/dashboard');
            } else {
                router.push('/student/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Google OAuth integration would go here
        // For demo, redirect to student dashboard
        router.push('/student/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-white">CRADI</span>
                </Link>

                <Card className="backdrop-blur-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl">Welcome Back</CardTitle>
                        <CardDescription className="text-base">
                            Sign in to continue your learning journey
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Google SSO Button */}
                        <Button
                            variant="ghost"
                            className="w-full"
                            size="lg"
                            onClick={handleGoogleLogin}
                        >
                            <Chrome className="w-5 h-5" />
                            Continue with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-background-dark text-gray-400">or continue with email</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                type="email"
                                label="Email Address"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<Mail className="w-5 h-5" />}
                                required
                            />

                            <Input
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<Lock className="w-5 h-5" />}
                                required
                            />

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                    <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                                    Remember me
                                </label>
                                <Link href="/reset-password" className="text-primary-400 hover:text-primary-300 transition-smooth">
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                size="lg"
                                isLoading={isLoading}
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="text-center text-sm text-gray-400">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-primary-400 hover:text-primary-300 font-semibold transition-smooth">
                                Sign up for free
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Protected by industry-standard encryption
                </p>
            </div>
        </div>
    );
}
