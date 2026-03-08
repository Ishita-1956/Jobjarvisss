// ===============================
// Enterprise Role Store
// ===============================
// Persists selected role (owner | recruiter) in localStorage
// so it survives across browser sessions after onboarding.

export type EnterpriseRole = 'owner' | 'recruiter';

const STORAGE_KEY = 'enterprise_role';

export function getEnterpriseRole(): EnterpriseRole | null {
    if (typeof window === 'undefined') return null;
    const role = localStorage.getItem(STORAGE_KEY);
    if (role === 'owner' || role === 'recruiter') return role;
    return null;
}

export function setEnterpriseRole(role: EnterpriseRole): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, role);
}

export function clearEnterpriseRole(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}
