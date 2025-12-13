// Constants for CRADI LMS

export const USER_ROLES = {
    INSTITUTE_LEAD: 'institute_lead',
    DEPARTMENT_LEAD: 'department_lead',
    LECTURER: 'lecturer',
    MASTERS_STUDENT: 'student',
    CERTIFICATE_LEARNER: 'certificate_learner',
} as const;

export const PROGRAMME_TYPES = {
    CERTIFICATE: 'certificate',
    MASTERS: 'masters',
} as const;

export const LEARNING_MODES = {
    SELF_PACED: 'self-paced',
    INSTRUCTOR_LED: 'instructor-led',
    HYBRID: 'hybrid',
} as const;

export const COURSE_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived',
} as const;

export const ENROLLMENT_STATUS = {
    ACTIVE: 'active',
    COMPLETED: 'completed',
    DROPPED: 'dropped',
} as const;

export const APPLICATION_STATUS = {
    SUBMITTED: 'submitted',
    UNDER_REVIEW: 'under_review',
    PENDING_DOCUMENTS: 'pending_documents',
    APPROVED: 'approved',
    REJECTED: 'rejected',
} as const;

export const GRADE_SCALE = [
    { letter: 'A', min: 90, max: 100, gpa: 4.0 },
    { letter: 'B', min: 80, max: 89, gpa: 3.0 },
    { letter: 'C', min: 70, max: 79, gpa: 2.0 },
    { letter: 'D', min: 60, max: 69, gpa: 1.0 },
    { letter: 'F', min: 0, max: 59, gpa: 0.0 },
] as const;

export const DEPARTMENTS = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Health Sciences',
    'Social Sciences',
    'Education',
] as const;

export const QUESTION_TYPES = {
    MULTIPLE_CHOICE: 'multiple_choice',
    MULTIPLE_SELECT: 'multiple_select',
    TRUE_FALSE: 'true_false',
    SHORT_ANSWER: 'short_answer',
    FILL_BLANK: 'fill_blank',
    MATCHING: 'matching',
} as const;

export const NOTIFICATION_TYPES = {
    ENROLLMENT: 'enrollment',
    GRADE_POSTED: 'grade_posted',
    ASSIGNMENT_DUE: 'assignment_due',
    ANNOUNCEMENT: 'announcement',
    APPLICATION: 'application',
    PAYMENT: 'payment',
} as const;
