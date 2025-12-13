import { z } from 'zod';

/**
 * Security-focused validation utilities
 * Prevents XSS, injection attacks, and validates user input
 */

/**
 * Email validation with sanitization
 */
export const emailSchema = z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .trim()
    .max(255, 'Email too long');

/**
 * Password validation with strength requirements
 */
export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

/**
 * Name validation (prevents XSS in names)
 */
export const nameSchema = z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters');

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHTML(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validate and sanitize text input
 */
export function sanitizeText(input: string, maxLength: number = 1000): string {
    return sanitizeHTML(input.trim().slice(0, maxLength));
}

/**
 * Course code validation
 */
export const courseCodeSchema = z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2,4}\s?\d{3,4}$/, 'Invalid course code format (e.g., CS 601)');

/**
 * Waiver code validation
 */
export const waiverCodeSchema = z
    .string()
    .trim()
    .toUpperCase()
    .min(4, 'Waiver code too short')
    .max(20, 'Waiver code too long')
    .regex(/^[A-Z0-9]+$/, 'Waiver code must contain only letters and numbers');

/**
 * UUID validation for IDs
 */
export const uuidSchema = z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid ID format');

/**
 * Validate file uploads
 */
export interface FileValidationOptions {
    maxSize: number;           // Max size in bytes
    allowedTypes: string[];    // MIME types
    allowedExtensions: string[]; // File extensions
}

export function validateFile(
    file: File,
    options: FileValidationOptions
): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > options.maxSize) {
        return {
            valid: false,
            error: `File too large. Maximum size: ${options.maxSize / 1024 / 1024}MB`,
        };
    }

    // Check MIME type
    if (!options.allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: `Invalid file type. Allowed: ${options.allowedTypes.join(', ')}`,
        };
    }

    // Check extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !options.allowedExtensions.includes(ext)) {
        return {
            valid: false,
            error: `Invalid file extension. Allowed: ${options.allowedExtensions.join(', ')}`,
        };
    }

    return { valid: true };
}

/**
 * Common file validation presets
 */
export const FileValidationPresets = {
    IMAGE: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    },
    DOCUMENT: {
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        allowedExtensions: ['pdf', 'doc', 'docx'],
    },
    VIDEO: {
        maxSize: 100 * 1024 * 1024, // 100MB
        allowedTypes: ['video/mp4', 'video/webm'],
        allowedExtensions: ['mp4', 'webm'],
    },
} as const;

/**
 * Prevent SQL injection by validating safe string patterns
 * Note: Prisma already prevents SQL injection, this is an extra layer
 */
export function isSafeString(input: string): boolean {
    // Check for common SQL injection patterns
    const dangerousPatterns = [
        /('|(--)|;|\/\*|\*\/|xp_|sp_)/i,
        /(union|select|insert|update|delete|drop|create|alter|exec|execute)/i,
    ];

    return !dangerousPatterns.some((pattern) => pattern.test(input));
}

/**
 * Generic validation error formatting
 */
export function formatValidationErrors(error: z.ZodError): Record<string, string> {
    const errors: Record<string, string> = {};

    error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
    });

    return errors;
}
