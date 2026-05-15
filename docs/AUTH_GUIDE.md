# CRADI LMS - Authentication Guide

## Current Authentication Status

⚠️ **Frontend Demo Mode** - The authentication is currently implemented as a frontend demonstration without backend integration.

## Available Auth Pages

### 1. Login Page
- **URL:** `http://localhost:3000/login`
- **Features:**
  - Email/password form
  - "Continue with Google" button (placeholder)
  - Remember me checkbox
  - Forgot password link
  - Sign up redirect

### 2. Signup Page
- **URL:** `http://localhost:3000/signup`
- **Features:**
  - Multi-step registration (Personal Info → Password)
  - Email/password creation
  - "Sign up with Google" button (placeholder)
  - Progress indicator
  - Login redirect

## How It Currently Works

### Login Flow (Demo):
1. Navigate to `/login`
2. Enter any email and password
3. Click "Sign In" or "Continue with Google"
4. **System automatically redirects to `/student/dashboard`** (after 1.5 second loading animation)

### Signup Flow (Demo):
1. Navigate to `/signup`
2. Fill in Step 1: Name, Email, Phone
3. Click "Continue"
4. Fill in Step 2: Password and Confirm Password
5. Click "Create Account"
6. **System automatically redirects to `/student/dashboard`** (after 1.5 second loading animation)

## What's NOT Implemented Yet

❌ Actual authentication validation  
❌ User session management  
❌ Password verification  
❌ Google OAuth integration  
❌ Backend API calls  
❌ JWT tokens  
❌ Protected routes  
❌ Role-based access control enforcement

## Next Steps for Real Authentication

To implement real authentication, you need to:

1. **Set up Backend API**
   ```bash
   # Create backend endpoints
   POST /api/auth/signup
   POST /api/auth/login
   POST /api/auth/google
   POST /api/auth/logout
   GET /api/auth/me
   ```

2. **Implement JWT Authentication**
   - Add JWT generation on login
   - Store tokens securely (httpOnly cookies)
   - Add middleware for protected routes

3. **Add Google OAuth**
   - Set up Google Cloud Console project
   - Configure OAuth credentials
   - Implement OAuth flow with Passport.js or similar

4. **Create Auth Context**
   ```typescript
   // lib/auth-context.tsx
   - useAuth() hook
   - Login/logout functions
   - User state management
   ```

5. **Protect Routes**
   ```typescript
   // middleware.ts
   - Check authentication on protected pages
   - Redirect to /login if not authenticated
   ```

## Testing the Demo

You can test the current demo by:

1. **Visit the landing page:** `http://localhost:3000`
2. **Click "Sign In"** → Takes you to `/login`
3. **Enter anything in the form** (validation is minimal)
4. **Click "Sign In"** → Redirects to student dashboard
5. **Or try signup:** `http://localhost:3000/signup`

## Common Issues

### "Auth not working"
If authentication isn't working:

1. **Check you're on the right URL:**
   - ✅ `http://localhost:3000/login`
   - ❌ `http://localhost:3000/auth/login` (doesn't exist)

2. **Clear browser cache:**
   ```
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Or clear browser cache completely
   ```

3. **Check dev server is running:**
   ```bash
   cd /Users/mac/CRADI
   npm run dev
   ```

4. **Look for console errors:**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

## Files to Modify for Real Auth

- `/app/login/page.tsx` - Update handleLogin function
- `/app/signup/page.tsx` - Update handleSubmit function
- Create `/lib/auth.ts` - Auth utilities
- Create `/app/api/auth/[...nextauth]/route.ts` - Auth API routes
- Create `middleware.ts` - Route protection

## Example: Implementing Real Login

```typescript
// app/login/page.tsx
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const { user, token } = await response.json();
    
    // Store token
    localStorage.setItem('token', token);
    
    // Redirect based on role
    if (user.role === 'student') {
      router.push('/student/dashboard');
    } else if (user.role === 'lecturer') {
      router.push('/lecturer/dashboard');
    } else if (user.role === 'institute_lead') {
      router.push('/admin/dashboard');
    }
  } catch (error) {
    setError('Login failed. Please check your credentials.');
  } finally {
    setIsLoading(false);
  }
};
```

## Support

For authentication issues, check:
1. Browser console for JavaScript errors
2. Network tab for failed API calls
3. Dev server terminal for compilation errors

---

**Remember:** This is currently a **UI demonstration**. For production use, you must implement proper backend authentication with security best practices.
