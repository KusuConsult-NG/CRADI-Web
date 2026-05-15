# CRADI LMS

## Overview

The CRADI Learning Management System (LMS) is a robust educational platform providing distinct portals for Students, Lecturers, and Administrators. It manages courses, enrollments, assignments, quizzes, and grading.

## Technologies Used

### Backend & Database
- **Prisma ORM** configured with SQLite
- **Models include:**
  - User (Student, Lecturer, Admin)
  - Course, Module, Lesson
  - Enrollment & Progress Tracking  
  - Assignment & Submission
  - Quiz & QuizAttempt
  - Certificate
  - Payment & WaiverCode
  - Announcement & Notification

### Authentication System
- **Password Hashing**: bcrypt
- **Token Management**: JWT
- **Endpoints:**
  - `POST /api/auth/signup` - User registration
  - `POST /api/auth/login` - User login
  - `GET /api/auth/me` - Get current user profile

## Setup & Development

### Environment Variables

Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret-key"
```

### Development Commands

```bash
# Start dev server
npm run dev

# View database
npx prisma studio

# Create migration after schema changes
npx prisma migrate dev --name <description>

# Reset database
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate
```

## API Testing Examples

### Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+234800000000",
    "role": "STUDENT"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Courses
```bash
curl http://localhost:3000/api/courses?search=machine&department=computer%20science
```
