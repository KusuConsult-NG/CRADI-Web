// Type definitions for CRADI LMS

export type UserRole = 'student' | 'lecturer' | 'department_lead' | 'institute_lead' | 'certificate_learner';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    department?: string;
}

export type ProgrammeType = 'certificate' | 'masters';
export type LearningMode = 'self-paced' | 'instructor-led' | 'hybrid';
export type CourseStatus = 'draft' | 'published' | 'archived';
export type EnrollmentStatus = 'active' | 'completed' | 'dropped';
export type ApplicationStatus = 'submitted' | 'under_review' | 'pending_documents' | 'approved' | 'rejected';

export interface Course {
    id: string;
    code: string;
    title: string;
    description: string;
    thumbnail: string;
    department: string;
    programmeType: ProgrammeType;
    learningMode: LearningMode;
    credits?: number;
    price: number;
    currency: string;
    duration: string;
    startDate?: string;
    endDate?: string;
    isEvergreen: boolean;
    maxEnrollment?: number;
    currentEnrollment: number;
    passPercentage: number;
    prerequisites: string[];
    lecturer: Lecturer;
    status: CourseStatus;
    rating?: number;
    reviewCount?: number;
}

export interface Lecturer {
    id: string;
    name: string;
    title: string;
    avatar: string;
    bio: string;
    department: string;
}

export interface Module {
    id: string;
    courseId: string;
    title: string;
    description: string;
    order: number;
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    moduleId: string;
    title: string;
    type: 'video' | 'reading' | 'quiz' | 'assignment';
    content: string;
    duration?: number;
    order: number;
    isCompleted: boolean;
    isLocked: boolean;
}

export interface Enrollment {
    id: string;
    userId: string;
    courseId: string;
    course: Course;
    enrollmentDate: string;
    completionDate?: string;
    status: EnrollmentStatus;
    progress: number;
    grade?: number;
    certificateId?: string;
}

export interface Application {
    id: string;
    applicantName: string;
    email: string;
    phone: string;
    programme: string;
    submittedDate: string;
    status: ApplicationStatus;
    gpa: number;
    documents: ApplicationDocument[];
}

export interface ApplicationDocument {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedAt: string;
}

export interface Certificate {
    id: string;
    userId: string;
    courseId: string;
    courseName: string;
    issuedDate: string;
    verificationCode: string;
    downloadUrl: string;
}

export interface WaiverCode {
    id: string;
    code: string;
    discountPercentage: number;
    usageLimit?: number;
    currentUsage: number;
    expirationDate?: string;
    applicableCourses: string[];
    isActive: boolean;
    notes: string;
}

export interface DashboardStats {
    totalStudents: number;
    totalCourses: number;
    totalRevenue: number;
    activeEnrollments: number;
    pendingApplications: number;
    completionRate: number;
}

export interface ProgressData {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalCredits: number;
    earnedCredits: number;
    currentGPA?: number;
    cumulativeGPA?: number;
}
