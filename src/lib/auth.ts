// ===============================
// Auth Utility Functions
// ===============================

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4321/dev";

export type UserRole = 'jobseeker' | 'recruiter' | 'admin' | 'employee';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  candidate_id?: number;
  company_id?: number;
  company_name?: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  redirect_url?: string;
}

/* =====================================================
   GOOGLE OAUTH (Direct Backend Redirect)
   ===================================================== */
export function initiateGoogleOAuth(role?: string): void {
  const isBrowser = typeof window !== 'undefined';
  const origin = isBrowser ? window.location.origin : 'http://localhost:3000';

  const dashboardPath = (role === 'recruiter' || role === 'admin')
    ? '/dashboard/enterprise'
    : '/dashboard';
  const dashboardUrl = `${origin}${dashboardPath}`;

  const currentRole = role || 'jobseeker';
  const url = `${API_BASE_URL}/signup-jobseeker?mode=signup&role=${currentRole}&response_type=redirect&redirect_url=${encodeURIComponent(dashboardUrl)}`;

  if (isBrowser) {
    window.location.href = url;
  }
}



/* =====================================================
   LOGIN WITH EMAIL & PASSWORD
   ===================================================== */

export async function loginWithCredentials(
  email: string,
  password: string,
  role: string
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error };
    }

    // ✅ Save token to localStorage after login
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Network error" };
  }
}

/* =====================================================
   ROLE BASED REDIRECT
   ===================================================== */

export function getRedirectUrl(user: User): string {
  switch (user.role) {
    case 'recruiter':
    case 'admin':
      return '/dashboard/enterprise';

    case 'jobseeker':
    case 'employee':
      return user.candidate_id
        ? '/dashboard'
        : '/onboarding/individual';

    default:
      return '/';
  }
}

/* =====================================================
   GET CURRENT USER SESSION
   ===================================================== */

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/login-success`, {
      method: "GET",
      credentials: "include",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('login-success status:', response.status);
    const data = await response.json();
    console.log('login-success data:', data);

    if (!response.ok) return null;
    return data;
  } catch {
    return null;
  }
}

/* =====================================================
   LOGOUT
   ===================================================== */

export async function logout(): Promise<void> {
  try {
    const token = localStorage.getItem('auth_token');
    await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    });
  } catch (error) {
    console.error('Logout error:', error);
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    sessionStorage.clear();
    window.location.href = '/';
  }
}

/* =====================================================
   RECRUITER SIGNUP
   ===================================================== */

export async function signupRecruiter(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  company_name: string;
  company_location: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.error || 'Signup failed' };
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
}

/* =====================================================
   JOBSEEKER SIGNUP
   ===================================================== */

export async function signupJobseeker(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('role', 'jobseeker');

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, message: result.error || 'Signup failed' };
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
}

/* =====================================================
   TERMS & PRIVACY
   ===================================================== */

export async function getTerms(): Promise<{ title: string; content: string } | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/terms`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to get terms:', error);
    return null;
  }
}

export async function getPrivacyPolicy(): Promise<{ title: string; content: string } | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/privacy`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to get privacy policy:', error);
    return null;
  }
}