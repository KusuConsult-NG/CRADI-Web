'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
    BookOpen,
    Clock,
    Users,
    Star,
    Filter,
    Search,
    GraduationCap,
    Video,
    Award,
    DollarSign,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('all');
    const [selectedType, setSelectedType] = useState('all');

    const courses = [
        {
            id: '1',
            title: 'Machine Learning Fundamentals',
            code: 'CS 601',
            description: 'Comprehensive introduction to machine learning algorithms, neural networks, and practical applications',
            department: 'Computer Science',
            type: 'Masters',
            mode: 'Instructor-led',
            priceNGN: 1920000, // ₦1,920,000
            priceUSD: 1200,
            duration: '12 weeks',
            students: 245,
            rating: 4.8,
            reviews: 89,
            lecturer: 'Dr. Sarah Johnson',
            credits: 3,
        },
        {
            id: '2',
            title: 'Web Development Bootcamp',
            code: 'CS 101',
            description: 'Learn full-stack web development with React, Node.js, and modern frameworks',
            department: 'Computer Science',
            type: 'Certificate',
            mode: 'Self-paced',
            priceNGN: 478400, // ₦478,400
            priceUSD: 299,
            duration: '8 weeks',
            students: 892,
            rating: 4.9,
            reviews: 234,
            lecturer: 'Prof. Michael Chen',
            credits: 0,
        },
        {
            id: '3',
            title: 'Strategic Business Management',
            code: 'MBA 550',
            description: 'Advanced strategies for business growth, leadership, and competitive advantage',
            department: 'Business Administration',
            type: 'Masters',
            mode: 'Hybrid',
            priceNGN: 2400000, // ₦2,400,000
            priceUSD: 1500,
            duration: '14 weeks',
            students: 178,
            rating: 4.7,
            reviews: 56,
            lecturer: 'Dr. Emily Rodriguez',
            credits: 4,
        },
        {
            id: '4',
            title: 'Digital Marketing Essentials',
            code: 'BUS 201',
            description: 'Master SEO, social media, content marketing, and analytics for digital success',
            department: 'Business Administration',
            type: 'Certificate',
            mode: 'Instructor-led',
            priceNGN: 638400, // ₦638,400
            priceUSD: 399,
            duration: '6 weeks',
            students: 456,
            rating: 4.6,
            reviews: 123,
            lecturer: 'Jane Smith',
            credits: 0,
        },
        {
            id: '5',
            title: 'Data Science Masterclass',
            code: 'CS 605',
            description: 'Deep dive into statistical analysis, data visualization, and predictive modeling',
            department: 'Computer Science',
            type: 'Masters',
            mode: 'Instructor-led',
            priceNGN: 2240000, // ₦2,240,000
            priceUSD: 1400,
            duration: '16 weeks',
            students: 312,
            rating: 4.9,
            reviews: 145,
            lecturer: 'Dr. Alex Kumar',
            credits: 4,
        },
        {
            id: '6',
            title: 'UI/UX Design Principles',
            code: 'DES 150',
            description: 'Create stunning user interfaces and delightful user experiences',
            department: 'Design',
            type: 'Certificate',
            mode: 'Self-paced',
            priceNGN: 398400, // ₦398,400
            priceUSD: 249,
            duration: '5 weeks',
            students: 678,
            rating: 4.8,
            reviews: 201,
            lecturer: 'Maria Garcia',
            credits: 0,
        },
    ];

    const departments = ['All', 'Computer Science', 'Business Administration', 'Design', 'Engineering'];

    // Filter and search courses
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            // Search filter
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.code.toLowerCase().includes(searchQuery.toLowerCase());

            // Department filter
            const matchesDepartment = selectedDepartment === 'all' ||
                course.department.toLowerCase() === selectedDepartment;

            // Type filter
            const matchesType = selectedType === 'all' ||
                course.type.toLowerCase() === selectedType;

            return matchesSearch && matchesDepartment && matchesType;
        });
    }, [searchQuery, selectedDepartment, selectedType]);

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Explore <span className="text-gradient-primary">Courses</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Discover world-class learning experiences designed for your success
                    </p>
                </div>

                {/* Search and Filters */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <Input
                                    type="search"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    icon={<Search className="w-5 h-5" />}
                                />
                            </div>

                            <select
                                className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                            >
                                {departments.map((dept) => (
                                    <option key={dept} value={dept.toLowerCase()} className="bg-background-dark">
                                        {dept}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="all" className="bg-background-dark">All Types</option>
                                <option value="certificate" className="bg-background-dark">Certificate</option>
                                <option value="masters" className="bg-background-dark">Master&apos;s</option>
                            </select>
                        </div>

                        {/* Results count */}
                        <div className="mt-4 text-sm text-gray-400">
                            Showing {filteredCourses.length} of {courses.length} courses
                        </div>
                    </CardContent>
                </Card>

                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course, index) => (
                            <Card key={course.id} className="group hover:shadow-glow animate-fade-in-up flex flex-col" style={{ animationDelay: `${index * 0.05}s` }}>
                                {/* Course Thumbnail */}
                                <div className="relative h-48 rounded-t-2xl bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-pink/20 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
                                    <GraduationCap className="w-20 h-20 text-primary-400 relative z-10" />
                                    <div className="absolute top-4 left-4">
                                        <Badge variant={course.type === 'Masters' ? 'purple' : 'success'}>
                                            {course.type}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="text-white text-sm font-semibold">{course.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Course Content */}
                                <CardHeader>
                                    <Badge variant="info" className="mb-2 self-start">{course.code}</Badge>
                                    <CardTitle className="text-xl group-hover:text-gradient-primary transition-smooth">
                                        {course.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        {course.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col justify-between">
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Users className="w-4 h-4" />
                                            <span>{course.students.toLocaleString()} students</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Clock className="w-4 h-4" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            {course.mode === 'Self-paced' ? <BookOpen className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                                            <span>{course.mode}</span>
                                        </div>
                                        {course.credits > 0 && (
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Award className="w-4 h-4" />
                                                <span>{course.credits} Credits</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="pt-4 border-t border-white/10">
                                            <div className="text-2xl font-bold text-gradient-primary mb-1">
                                                ₦{course.priceNGN.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ${course.priceUSD} USD • {course.reviews} reviews
                                            </div>
                                        </div>

                                        <Link href={`/courses/${course.id}`} className="block">
                                            <Button variant="primary" className="w-full">
                                                Learn More
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
                            <p>Try adjusting your search or filters</p>
                        </div>
                        <Button variant="ghost" onClick={() => {
                            setSearchQuery('');
                            setSelectedDepartment('all');
                            setSelectedType('all');
                        }}>
                            Clear Filters
                        </Button>
                    </Card>
                )}

                {/* Stats Footer */}
                <Card className="mt-12">
                    <CardContent className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {[
                                { label: 'Total Courses', value: '150+', icon: BookOpen },
                                { label: 'Active Students', value: '10,000+', icon: Users },
                                { label: 'Success Rate', value: '95%', icon: TrendingUp },
                                { label: 'Certifications', value: '25,000+', icon: Award },
                            ].map((stat, index) => (
                                <div key={index}>
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                                        <stat.icon className="w-6 h-6 text-primary-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-gradient-primary mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
