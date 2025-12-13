'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
    GraduationCap,
    BookOpen,
    Users,
    Trophy,
    Sparkles,
    ArrowRight,
    Play,
    CheckCircle2,
    Star,
    TrendingUp,
    Globe,
    Award
} from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <img src="/cradi-logo.jpeg" alt="CRADI Logo" className="h-12 w-auto rounded-lg bg-white/95 px-3 py-1.5 shadow-md" />
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/courses" className="text-gray-300 hover:text-white transition-smooth">
                                Courses
                            </Link>
                            <Link href="/about" className="text-gray-300 hover:text-white transition-smooth">
                                About
                            </Link>
                            <Link href="/contact" className="text-gray-300 hover:text-white transition-smooth">
                                Contact
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Sign In</Button>
                            </Link>
                            <Link href="/signup">
                                <Button variant="primary" size="sm">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute top-40 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-accent-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-300">Transform Your Future with CRADI</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="text-white">Master Your </span>
                            <span className="text-gradient-primary">Craft</span>
                            <br />
                            <span className="text-white">Advance Your </span>
                            <span className="text-gradient-secondary">Career</span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Access world-class education with our comprehensive Learning Management System.
                            From professional certificates to Master's degrees—all designed for your success.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/signup">
                                <Button variant="primary" size="lg">
                                    Start Learning Free
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/courses">
                                <Button variant="ghost" size="lg">
                                    <Play className="w-5 h-5" />
                                    Explore Courses
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                                <span>Instant access</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20">
                        {[
                            { label: 'Active Learners', value: '10,000+', icon: Users },
                            { label: 'Expert Lecturers', value: '150+', icon: Award },
                            { label: 'Course Completion', value: '95%', icon: TrendingUp },
                            { label: 'Countries', value: '50+', icon: Globe },
                        ].map((stat, index) => (
                            <Card key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardContent className="pt-6">
                                    <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                                    <div className="text-3xl font-bold text-gradient-primary mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Why Choose <span className="text-gradient-primary">CRADI?</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Experience a learning platform designed for the modern learner with cutting-edge features
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BookOpen,
                                title: 'Flexible Learning',
                                description: 'Self-paced and instructor-led courses tailored to fit your schedule and learning style',
                                color: 'from-primary-400 to-primary-600',
                            },
                            {
                                icon: Trophy,
                                title: 'Verified Credentials',
                                description: 'Earn certificates and transcripts with blockchain verification for authenticity',
                                color: 'from-secondary-500 to-secondary-700',
                            },
                            {
                                icon: Users,
                                title: 'Expert Instructors',
                                description: 'Learn from industry professionals and academic leaders in their fields',
                                color: 'from-secondary-400 to-secondary-600',
                            },
                            {
                                icon: GraduationCap,
                                title: 'Degree Programs',
                                description: 'Complete Master\'s degree programs with structured curriculum and rigorous academics',
                                color: 'from-primary-500 to-primary-700',
                            },
                            {
                                icon: Sparkles,
                                title: 'Modern Platform',
                                description: 'Intuitive interface with real-time progress tracking and seamless Google Workspace integration',
                                color: 'from-secondary-300 to-secondary-500',
                            },
                            {
                                icon: Star,
                                title: 'Global Access',
                                description: 'Study from anywhere with international payment options and 24/7 course availability',
                                color: 'from-primary-300 to-primary-500',
                            },
                        ].map((feature, index) => (
                            <Card key={index} className="group hover:shadow-glow animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardHeader>
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-pink/20" />
                        <div className="relative p-12 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Transform Your Future?
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                Join thousands of learners advancing their careers through our comprehensive programs
                            </p>
                            <Link href="/signup">
                                <Button variant="primary" size="xl">
                                    Get Started for Free
                                    <ArrowRight className="w-6 h-6" />
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/cradi-logo.jpeg" alt="CRADI Logo" className="h-10 w-auto rounded-lg bg-white/95 px-3 py-1.5 shadow-md" />
                            </div>
                            <p className="text-gray-400 text-sm">
                                Empowering learners worldwide with quality education and verified credentials.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Programs</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/courses?type=certificate" className="hover:text-white transition-smooth">Certificates</Link></li>
                                <li><Link href="/courses?type=masters" className="hover:text-white transition-smooth">Master's Degrees</Link></li>
                                <li><Link href="/courses" className="hover:text-white transition-smooth">All Courses</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/about" className="hover:text-white transition-smooth">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-smooth">Contact</Link></li>
                                <li><Link href="/careers" className="hover:text-white transition-smooth">Careers</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/help" className="hover:text-white transition-smooth">Help Center</Link></li>
                                <li><Link href="/privacy" className="hover:text-white transition-smooth">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition-smooth">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Crest Research And Development Institute. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
