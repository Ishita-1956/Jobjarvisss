// ===============================
// Admin Dashboard API Client
// ===============================

const API_BASE = 'http://localhost:4321/adm/api';

// ─── Types ───────────────────────────────────────────────
export interface AdminJob {
    id: number;
    created_at: string;
    candidate_name: string;
    candidate_id: number;
    title: string;
    company: string;
    location: string;
    link: string;
    source: string;
    status: string;
    comment: string;
    resume_available: boolean;
}

export interface JobsResponse {
    jobs: AdminJob[];
    total: number;
    pages: number;
    current_page: number;
}

export interface AdminCandidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    title: string;
    recruiter_id: number;
    profile_image: string;
    resume_path: string;
    key_skills: string;
    preferred_location: string;
    work_authorization: string;
    employment_type: string;
    job_type: string;
    salary_expectations: string;
    state: string;
    remote_only: boolean;
    employment: string;
    education: string;
    certifications: string;
    projects: string;
    // Generic Questions
    gq_relocate: string;
    gq_job_function: string;
    gq_eng_roles: string;
    gq_is_student: string;
    gq_experience_years: string;
    gq_company_size: string;
    gq_value_equity: string;
    gq_min_salary: string;
    gq_short_phrase: string;
    gq_next_role_wants: string;
    gq_proud_project: string;
    gq_search_status: string;
    gq_yc_worked: string;
    gq_hidden_yc_companies: string;
    gq_portfolio_links: string;
    // Board Status
    dice_active: boolean;
    yc_active: boolean;
    job_jarvis_active: boolean;
    // Credentials (Admin)
    dice_password: string;
    yc_password: string;
    password: string;
}

export interface JobFilters {
    page?: number;
    per_page?: number;
    status?: string;
    source?: string;
    candidate_name?: string;
}

// ─── API Functions ───────────────────────────────────────

export async function fetchJobs(filters: JobFilters = {}): Promise<JobsResponse> {
    const params = new URLSearchParams();
    if (filters.page) params.set('page', String(filters.page));
    if (filters.per_page) params.set('per_page', String(filters.per_page));
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters.source && filters.source !== 'all') params.set('source', filters.source);
    if (filters.candidate_name) params.set('candidate_name', filters.candidate_name);

    const res = await fetch(`${API_BASE}/jobs?${params.toString()}`, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
}

export async function updateJob(
    jobId: number,
    data: { status?: string; comment?: string }
): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update job');
    return res.json();
}

export async function fetchCandidate(candidateId: number): Promise<AdminCandidate> {
    const res = await fetch(`${API_BASE}/candidate/${candidateId}`, {
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to fetch candidate');
    return res.json();
}

export function getResumeDownloadUrl(candidateId: number): string {
    return `${API_BASE}/resume/${candidateId}`;
}
