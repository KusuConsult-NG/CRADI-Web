# CRADI LMS - Enrollment System Flow

## Complete Enrollment Journey

```mermaid
graph TD
    A[Student Browses Courses] --> B{Logged In?}
    B -->|No| C[Redirect to Login]
    C --> D[Login/Signup]
    D --> E[Return to Course]
    B -->|Yes| E[View Course Details]
    
    E --> F{Has Waiver Code?}
    F -->|Yes| G[Enter Waiver Code]
    F -->|No| H[Click Enroll Now]
    G --> I[Submit Enrollment]
    H --> I
    
    I --> J[API: POST /api/enrollments]
    
    J --> K{Validate Waiver}
    K -->|Invalid| L[Show Error]
    L --> E
    
    K -->|Valid/None| M{Calculate Amount}
    
    M -->|Full Waiver| N[Create Enrollment - Status: ACTIVE]
    M -->|Partial/No Waiver| O[Create Payment Record]
    
    N --> P[Update Course Count]
    P --> Q[Create Notification]
    Q --> R[Redirect to Student Dashboard]
    
    O --> S[Show Payment Required]
    S --> T[Process Payment via Paystack]
    T --> U{Payment Success?}
    U -->|Yes| N
    U -->|No| V[Payment Failed]
    
    R --> W[Student Dashboard Shows Course]
    W --> X[Lecturer Roster Updated]
    X --> Y[Progress Tracking Begins]
```

## Key API Endpoints

### 1. Enrollment Creation
**Endpoint:** `POST /api/enrollments`

**Request:**
```json
{
  "courseId": "course-123",
  "waiverCode": "SCHOLAR2025" // optional
}
```

**Response (Full Waiver):**
```json
{
  "success": true,
  "enrollment": {
    "id": "enroll-456",
    "userId": "user-789",
    "courseId": "course-123",
    "status": "ACTIVE",
    "progress": 0,
    "course": {
      "id": "course-123",
      "code": "CS 601",
      "title": "Machine Learning Fundamentals"
    }
  },
  "message": "Successfully enrolled in course"
}
```

**Response (Requires Payment):**
```json
{
  "success": true,
  "requiresPayment": true,
  "payment": {
    "id": "pay-123",
    "amount": 375000, // After discount
    "reference": "PAY-1234567890-abc123",
    "course": {
      "title": "Machine Learning Fundamentals",
      "code": "CS 601"
    }
  }
}
```

### 2. Student Enrollments
**Endpoint:** `GET /api/enrollments`

**Response:**
```json
{
  "enrollments": [
    {
      "id": "enroll-456",
      "courseId": "course-123",
      "status": "ACTIVE",
      "progress": 35,
      "enrolledAt": "2025-12-10",
      "calculatedProgress": 35,
      "totalLessons": 20,
      "completedLessons": 7,
      "course": {
        "id": "course-123",
        "code": "CS 601",
        "title": "Machine Learning Fundamentals",
        "lecturer": {
          "name": "Dr. Sarah Johnson"
        }
      }
    }
  ]
}
```

### 3. Lecturer Courses
**Endpoint:** `GET /api/lecturer/courses`

**Response:**
```json
{
  "courses": [
    {
      "id": "course-123",
      "code": "CS 601",
      "title": "Machine Learning Fundamentals",
      "students": 45,
      "modules": 8,
      "assignments": 12,
      "averageGrade": 85,
      "averageProgress": 67
    }
  ]
}
```

### 4. Course Roster
**Endpoint:** `GET /api/courses/[id]/students`

**Response:**
```json
{
  "students": [
    {
      "id": "user-789",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "studentId": "CRADI-2025-001",
      "progress": 85,
      "grade": 88,
      "completedLessons": 17,
      "totalLessons": 20
    }
  ]
}
```

## How the System Connects

### Admin → Lecturer → Student Flow

```mermaid
sequenceDiagram
    participant Admin
    participant Database
    participant Lecturer
    participant Student
    
    Admin->>Database: Create Course (with lecturerId)
    Database-->>Admin: Course Created
    
    Database-->>Lecturer: Course appears in GET /lecturer/courses
    Lecturer->>Lecturer: Add modules & assignments
    
    Student->>Database: Browse courses
    Student->>Database: POST /enrollments (with waiver)
    Database->>Database: Validate waiver code
    Database->>Database: Create enrollment
    Database-->>Student: Enrollment success
    
    Database-->>Student: Course appears in dashboard
    Database-->>Lecturer: Student appears in roster
    
    Student->>Database: Complete lessons
    Database->>Database: Update progress
    Database-->>Lecturer: Progress updates in dashboard
```

## Testing the Enrollment Flow

### Test Scenario 1: Full Waiver Enrollment
1. **Student** goes to `/courses/1`
2. Clicks "Have a waiver code?"
3. Enters `SCHOLAR2025`
4. Clicks "Enroll with Waiver"
5. **Result:** Instantly enrolled, redirected to dashboard

### Test Scenario 2: Partial Waiver
1. **Student** goes to `/courses/1`
2. Enters waiver code `EARLYBIRD50`
3. **Result:** Payment required for 50% of price

### Test Scenario 3: No Waiver
1. **Student** goes to `/courses/1`
2. Clicks "Enroll Now"
3. **Result:** Payment required for full price

### Test Scenario 4: Lecturer Views Roster
1. **Lecturer** logs in
2. Goes to `/lecturer/courses/1`
3. **Result:** Sees all enrolled students with progress

## Database Flow

**When student enrolls:**
1. Check existing enrollment
2. Validate course availability
3. Process waiver code (if provided)
4. Create Payment record
5. Create Enrollment record (if fully waived)
6. Update waiver usage count
7. Increment course enrollment count
8. Create success notification

**When lecturer views roster:**
1. Verify lecturer owns course
2. Fetch all active enrollments
3. Calculate progress for each student
4. Return enriched student data

## Required Waiver Codes (For Testing)

Add these to your database:
- `SCHOLAR2025` - 100% waiver (FULL_WAIVER)
- `EARLYBIRD50` - 50% discount (PERCENTAGE, value: 50)
- `ALUMNI25` - 25% discount (PERCENTAGE, value: 25)

## Next Steps

1. Update student dashboard to fetch real enrollments
2. Update lecturer roster to fetch real students
3. Test complete flow end-to-end
4. Add payment gateway integration
