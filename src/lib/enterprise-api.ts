// ===============================
// Enterprise API Service Layer
// ===============================
// All functions attempt real API calls and return empty data on failure.
// No mock data — backend APIs will be wired in later.

const API_BASE_URL = 'http://localhost:4321/dev';

// ========================
// Type Definitions
// ========================

export interface OwnerStats {
    totalRecruiters: number;
    activeJobs: number;
    totalCandidates: number;
    hiringEfficiency: number;
    recruitersChange: string;
    jobsChange: string;
    candidatesChange: string;
    efficiencyChange: string;
}

export interface Recruiter {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
    avatar?: string;
    joinedDate?: string;
    stats: {
        hired: number;
        active: number;
        rejected: number;
        interviewing: number;
    };
}

export interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    title: string;
    status: 'New' | 'Reviewing' | 'Interviewing' | 'Offer Sent' | 'Hired' | 'Rejected';
    appliedDate: string;
    matchScore: number;
    recruiterId?: number;
    recruiterName?: string;
    keySkills: string;
    resumePath?: string;
    profileImage?: string;
    experience: string;
    salaryExpectation: string;
    minSalary: string;
    location?: string;
    willingToRelocate: boolean;
    jobFunction: string;
    shortPhrase: string;
    proudProject: string;
}

export interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string; // Full-time, Part-time, Contract
    status: 'Active' | 'Paused' | 'Closed';
    applicants: number;
    postedDate: string;
    assignedRecruiterId?: number;
}

export interface ActivityItem {
    id: number;
    user: string;
    action: string;
    target: string;
    role?: string;
    timestamp: string;
}

export interface AnalyticsData {
    hiringFunnel: { stage: string; count: number }[];
    timeToHire: { month: string; days: number }[];
    recruiterPerformance: { name: string; hires: number; efficiency: number }[];
    monthlyPlacements: { month: string; count: number }[];
}

export interface RecruiterStats {
    myCandidates: number;
    activeJobs: number;
    interviewsToday: number;
    offerAcceptanceRate: number;
    candidatesChange: string;
    jobsChange: string;
    interviewsChange: string;
    offerChange: string;
}

// ========================
// Owner API Functions
// ========================

export async function getOwnerStats(): Promise<OwnerStats> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/owner/stats`, {
            credentials: 'include',
        });
        if (res.ok) return await res.json();
    } catch (e) { /* API not ready */ }
    return {
        totalRecruiters: 0,
        activeJobs: 0,
        totalCandidates: 0,
        hiringEfficiency: 0,
        recruitersChange: '',
        jobsChange: '',
        candidatesChange: '',
        efficiencyChange: '',
    };
}

export async function getRecruiters(): Promise<Recruiter[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/recruiters`, {
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            return data.recruiters || [];
        }
    } catch (e) { /* API not ready */ }
    return [];
}

export async function getRecruiterById(id: number): Promise<Recruiter | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/recruiters/${id}`, {
            credentials: 'include',
        });
        if (res.ok) return await res.json();
    } catch (e) { /* API not ready */ }
    return null;
}

export async function getAllCandidates(): Promise<Candidate[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/candidates`, {
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            return data.candidates || [];
        }
    } catch (e) { /* API not ready */ }
    return [];
}

export async function getCandidateById(id: number): Promise<Candidate | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/candidates/${id}`, {
            credentials: 'include',
        });
        if (res.ok) return await res.json();
    } catch (e) { /* API not ready */ }
    return null;
}

export async function getOwnerAnalytics(): Promise<AnalyticsData> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/owner/analytics`, {
            credentials: 'include',
        });
        if (res.ok) return await res.json();
    } catch (e) { /* API not ready */ }
    return {
        hiringFunnel: [],
        timeToHire: [],
        recruiterPerformance: [],
        monthlyPlacements: [],
    };
}

export async function getOwnerActivityFeed(): Promise<ActivityItem[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/owner/activity`, {
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            return data.activity || [];
        }
    } catch (e) { /* API not ready */ }
    return [];
}

// ========================
// Recruiter API Functions
// ========================

export async function getRecruiterStats(): Promise<RecruiterStats> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/recruiter/stats`, {
            credentials: 'include',
        });
        if (res.ok) return await res.json();
    } catch (e) { /* API not ready */ }
    return {
        myCandidates: 0,
        activeJobs: 0,
        interviewsToday: 0,
        offerAcceptanceRate: 0,
        candidatesChange: '',
        jobsChange: '',
        interviewsChange: '',
        offerChange: '',
    };
}

export async function getRecruiterCandidates(): Promise<Candidate[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/recruiter/candidates`, {
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            return data.candidates || [];
        }
    } catch (e) { /* API not ready */ }
    return [];
}

export async function getRecruiterJobs(): Promise<Job[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/recruiter/jobs`, {
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            return data.jobs || [];
        }
    } catch (e) { /* API not ready */ }
    return [];
}

export async function getRecruiterAnalytics(): Promise<AnalyticsData> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/recruiter/analytics`, {
            credentials: 'include',
        });
        if (res.ok) return await res.json();
    } catch (e) { /* API not ready */ }
    return {
        hiringFunnel: [],
        timeToHire: [],
        recruiterPerformance: [],
        monthlyPlacements: [],
    };
}

export async function getRecruiterActivityFeed(): Promise<ActivityItem[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/recruiter/activity`, {
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            return data.activity || [];
        }
    } catch (e) { /* API not ready */ }
    return [];
}

// ========================
// Candidate Profile Edit
// ========================

export async function updateCandidateProfile(
    id: number,
    data: Partial<Candidate>
): Promise<{ success: boolean; message: string }> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/candidates/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) return { success: true, message: result.message || 'Profile updated' };
        return { success: false, message: result.error || 'Update failed' };
    } catch (e) {
        return { success: false, message: 'Network error. Please try again.' };
    }
}

// ========================
// Recruiter by candidates
// ========================

export async function getCandidatesByRecruiter(recruiterId: number): Promise<Candidate[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/enterprise/recruiters/${recruiterId}/candidates`, {
            credentials: 'include',
        });
        if (res.ok) {
            const data = await res.json();
            return data.candidates || [];
        }
    } catch (e) { /* API not ready */ }
    return [];
}
