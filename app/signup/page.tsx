'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { GraduationCap, Mail, Lock, User, Chrome, Phone } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'student', // Default role
    });
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Call real API
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    role: formData.role.toUpperCase(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Signup failed');
                setIsLoading(false);
                return;
            }

            // Store user data and token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect based on role
            if (formData.role === 'lecturer') {
                router.push('/lecturer/dashboard');
            } else if (formData.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/student/dashboard');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup');
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        // In real implementation, role would be determined after OAuth
        router.push('/student/dashboard');
    };

    const updateFormData = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
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
                        <CardTitle className="text-3xl">Create Account</CardTitle>
                        <CardDescription className="text-base">
                            Start your learning journey today
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Google SSO Button */}
                        <Button
                            variant="ghost"
                            className="w-full"
                            size="lg"
                            onClick={handleGoogleSignup}
                        >
                            <Chrome className="w-5 h-5" />
                            Sign up with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-background-dark text-gray-400">or sign up with email</span>
                            </div>
                        </div>

                        {/* Progress Indicator */}
                        <div className="flex justify-center gap-2">
                            <div className={`h-1 w-12 rounded-full transition-smooth ${step >= 1 ? 'bg-gradient-primary' : 'bg-white/10'}`} />
                            <div className={`h-1 w-12 rounded-full transition-smooth ${step >= 2 ? 'bg-gradient-primary' : 'bg-white/10'}`} />
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {step === 1 && (
                                <>
                                    <Input
                                        type="text"
                                        label="Full Name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => updateFormData('name', e.target.value)}
                                        icon={<User className="w-5 h-5" />}
                                        required
                                    />

                                    <Input
                                        type="email"
                                        label="Email Address"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => updateFormData('email', e.target.value)}
                                        icon={<Mail className="w-5 h-5" />}
                                        required
                                    />

                                    <Input
                                        type="tel"
                                        label="Phone Number"
                                        placeholder="+234 (800) 000-0000"
                                        value={formData.phone}
                                        onChange={(e) => updateFormData('phone', e.target.value)}
                                        icon={<Phone className="w-5 h-5" />}
                                        required
                                    />

                                    {/* Role Selection */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-gray-300">
                                            I am signing up as:
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { value: 'student', label: 'Student', icon: '🎓' },
                                                { value: 'lecturer', label: 'Lecturer', icon: '👨‍🏫' },
                                                { value: 'admin', label: 'Admin', icon: '👔' },
                                            ].map((roleOption) => (
                                                <button
                                                    key={roleOption.value}
                                                    type="button"
                                                    onClick={() => updateFormData('role', roleOption.value)}
                                                    className={`p-3 rounded-lg border-2 transition-smooth text-center ${formData.role === roleOption.value
                                                        ? 'border-primary-500 bg-primary-500/20'
                                                        : 'border-white/10 bg-white/5 hover:border-white/20'
                                                        }`}
                                                >
                                                    <div className="text-2xl mb-1">{roleOption.icon}</div>
                                                    <div className="text-sm font-medium text-white">
                                                        {roleOption.label}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="w-full"
                                        size="lg"
                                        onClick={() => setStep(2)}
                                    >
                                        Continue
                                    </Button>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <Input
                                        type="password"
                                        label="Password"
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={(e) => updateFormData('password', e.target.value)}
                                        icon={<Lock className="w-5 h-5" />}
                                        required
                                    />

                                    <Input
                                        type="password"
                                        label="Confirm Password"
                                        placeholder="Re-enter your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                                        icon={<Lock className="w-5 h-5" />}
                                        required
                                    />

                                    <div className="text-xs text-gray-400 space-y-1">
                                        <p>Password must contain:</p>
                                        <ul className="list-disc list-inside space-y-0.5">
                                            <li>At least 8 characters</li>
                                            <li>One uppercase letter</li>
                                            <li>One number</li>
                                        </ul>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="flex-1"
                                            onClick={() => setStep(1)}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="flex-1"
                                            size="lg"
                                            isLoading={isLoading}
                                        >
                                            Create Account
                                        </Button>
                                    </div>
                                </>
                            )}
                        </form>

                        <div className="text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-smooth">
                                Sign in
                            </Link>
                        </div>

                        <p className="text-xs text-gray-500 text-center">
                            By signing up, you agree to our{' '}
                            <Link href="/terms" className="text-primary-400 hover:underline">Terms of Service</Link>
                            {' '}and{' '}
                            <Link href="/privacy" className="text-primary-400 hover:underline">Privacy Policy</Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
