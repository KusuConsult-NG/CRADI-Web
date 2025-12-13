'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
    GraduationCap,
    Target,
    Users,
    Award,
    Globe,
    BookOpen,
    TrendingUp,
    Heart,
} from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">CRADI</span>
                        </Link>

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
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            About <span className="text-gradient-secondary">CRADI</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Crest Research And Development Institute is a leading educational institution
                            committed to excellence in professional development and postgraduate education.
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <Card className="hover:shadow-glow transition-smooth">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-xl bg-gradient-secondary flex items-center justify-center mb-4">
                                    <Target className="w-7 h-7 text-white" />
                                </div>
                                <CardTitle className="text-2xl">Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 leading-relaxed">
                                    To provide accessible, high-quality education that empowers individuals
                                    to achieve their professional and academic goals through innovative
                                    learning experiences and industry-relevant programs.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-glow transition-smooth">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                                    <Award className="w-7 h-7 text-white" />
                                </div>
                                <CardTitle className="text-2xl">Our Vision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 leading-relaxed">
                                    To be recognized as a premier institution for research, innovation,
                                    and professional development, creating global leaders who drive positive
                                    change in their communities and industries.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Core Values */}
                    <div className="mb-20">
                        <h2 className="text-4xl font-bold text-white text-center mb-12">
                            Our Core Values
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                {
                                    icon: BookOpen,
                                    title: 'Excellence',
                                    description: 'Committed to the highest standards in education and research',
                                },
                                {
                                    icon: Users,
                                    title: 'Integrity',
                                    description: 'Upholding ethical practices in all our endeavors',
                                },
                                {
                                    icon: TrendingUp,
                                    title: 'Innovation',
                                    description: 'Embracing new ideas and cutting-edge methodologies',
                                },
                                {
                                    icon: Heart,
                                    title: 'Community',
                                    description: 'Building supportive learning environments for all',
                                },
                            ].map((value, index) => (
                                <Card key={index} className="text-center hover:shadow-glow transition-smooth">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-blend flex items-center justify-center mx-auto mb-4">
                                            <value.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                        <p className="text-sm text-gray-400">{value.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid md:grid-cols-4 gap-8 mb-20">
                        {[
                            { label: 'Active Students', value: '10,000+', icon: Users },
                            { label: 'Expert Faculty', value: '150+', icon: Award },
                            { label: 'Programs Offered', value: '50+', icon: BookOpen },
                            { label: 'Countries Reached', value: '50+', icon: Globe },
                        ].map((stat, index) => (
                            <Card key={index} className="text-center">
                                <CardContent className="pt-6">
                                    <stat.icon className="w-10 h-10 text-secondary-500 mx-auto mb-3" />
                                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* What We Offer */}
                    <div className="mb-20">
                        <h2 className="text-4xl font-bold text-white text-center mb-12">
                            What We Offer
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Professional Certificates</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-secondary-500 mt-1">•</span>
                                            Industry-recognized certification programs
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-secondary-500 mt-1">•</span>
                                            Flexible online and self-paced learning
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-secondary-500 mt-1">•</span>
                                            Practical, career-focused curriculum
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-secondary-500 mt-1">•</span>
                                            Blockchain-verified credentials
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Master's Degrees</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <span className="text-secondary-500 mt-1">•</span>
                                            Comprehensive postgraduate programs
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-secondary-500 mt-1">•</span>
                                            Research-driven academic excellence
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-secondary-500 mt-1">•</span>
                                            Expert faculty and mentorship
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-secondary-500 mt-1">•</span>
                                            Internationally recognized degrees
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <Card className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-blend opacity-20" />
                        <div className="relative p-12 text-center">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Join CRADI Today
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                Start your journey towards academic and professional excellence
                            </p>
                            <Link href="/signup">
                                <Button variant="primary" size="lg">
                                    Get Started Now
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 px-4">
                <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Crest Research And Development Institute. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
