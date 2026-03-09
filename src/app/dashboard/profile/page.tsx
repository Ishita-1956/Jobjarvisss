'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const tabs = [
    { id: 'resume', label: 'Resume', icon: '📄' },
    { id: 'work-auth', label: 'Work Authorization', icon: '🛂' },
    { id: 'job-prefs', label: 'Job Preferences', icon: '💼' },
    { id: 'location', label: 'Location', icon: '📍' },
    { id: 'generic', label: 'Generic Questions', icon: '❓' },
    { id: 'account', label: 'Account', icon: '⚙️' },
];

const presetSkills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java', 'C++',
    'AWS', 'Docker', 'Kubernetes', 'Git', 'SQL', 'MongoDB', 'PostgreSQL', 'Redis',
    'GraphQL', 'REST API', 'HTML/CSS', 'Tailwind CSS', 'Vue.js', 'Angular', 'Go',
    'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native', 'Machine Learning', 'TensorFlow',
    'PyTorch', 'Data Science', 'DevOps', 'CI/CD', 'Agile', 'Scrum', 'Figma',
    'System Design', 'Microservices', 'Linux', 'Firebase', 'Supabase',
];

const workAuthOptions = [
    'US Citizen', 'Green Card Holder', 'H-1B Visa', 'L-1 Visa', 'OPT/CPT',
    'TN Visa', 'O-1 Visa', 'EAD', 'Need Sponsorship', 'Other',
];

const employmentTypes = [
    'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance', 'Temporary',
];

const jobTypes = ['On-site', 'Remote', 'Hybrid', 'Flexible'];

const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'India', 'Australia',
    'France', 'Netherlands', 'Singapore', 'Japan', 'Other',
];

const usStates = [
    'California', 'New York', 'Texas', 'Washington', 'Massachusetts',
    'Illinois', 'Colorado', 'Virginia', 'Georgia', 'Florida',
    'North Carolina', 'Pennsylvania', 'Oregon', 'Arizona', 'Ohio', 'Other',
];

const educationLevels = [
    'High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree',
    'PhD', 'Professional Degree (MD, JD)', 'Bootcamp Certificate', 'Self-Taught',
];

const experienceYears = [
    '0-1 years', '1-3 years', '3-5 years', '5-8 years', '8-10 years', '10-15 years', '15+ years',
];

const companySizes = [
    { label: 'Seed: 1–10', key: 'seed' },
    { label: 'Small: 11–50', key: 'small' },
    { label: 'Medium: 51–300', key: 'medium' },
    { label: 'Large: 301+', key: 'large' },
];

const jobFunctions = [
    'Software Engineering', 'Data Science', 'Product Management', 'Design',
    'Marketing', 'Sales', 'Operations', 'Human Resources', 'Finance',
    'Customer Success', 'DevOps/SRE', 'QA/Testing', 'Security', 'Other',
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('resume');
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [savedTabs, setSavedTabs] = useState<Set<string>>(new Set());
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [candidateId, setCandidateId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        resumeFile: null as File | null,
        resumeFileName: '',
        jobTitle: '',
        skills: [] as string[],
        skillInput: '',
        workAuth: '',
        employmentType: '',
        jobType: [] as string[],
        country: '',
        state: '',
        firstName: '',
        fullLegalName: '',
        phone: '',
        address: '',
        address2: '',
        city: '',
        zip: '',
        stateProvince: '',
        countryField: '',
        coverLetter: '',
        linkedinUrl: '',
        githubUrl: '',
        portfolioUrl: '',
        otherUrl: '',
        portfolioPassword: '',
        jobFunction: '',
        willingToRelocate: '',
        companySizePrefs: {} as Record<string, string>,
        equityPreference: '',
        salaryRequirement: '',
        jobSearchStatus: '',
        education: '',
        yearsExperience: '',
        isFullTimeStudent: '',
        shortDescription: '',
        nextRoleDescription: '',
        proudProject: '',
        gender: '',
        race: '',
        veteranStatus: '',
        isOver18: '',
        legallyAuthorized: '',
        needSponsorship: '',
        consentTexts: '',
        previouslyEmployed: '',
        ycAffiliation: '',
        ycHidden: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (field: string, value: string | string[] | File | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (fieldErrors[field]) {
            setFieldErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
        }
    };

    const handlePhoneChange = (value: string) => {
        handleChange('phone', value.replace(/\D/g, '').slice(0, 15));
    };

    const handleZipChange = (value: string) => {
        handleChange('zip', value.replace(/\D/g, '').slice(0, 10));
    };

    const handleSkillAdd = () => {
        const skill = formData.skillInput.trim();
        if (skill && !formData.skills.includes(skill)) {
            handleChange('skills', [...formData.skills, skill]);
            handleChange('skillInput', '');
        }
    };

    const handleSkillRemove = (skill: string) => {
        handleChange('skills', formData.skills.filter((s) => s !== skill));
    };

    const handlePresetSkillToggle = (skill: string) => {
        if (formData.skills.includes(skill)) handleSkillRemove(skill);
        else handleChange('skills', [...formData.skills, skill]);
    };

    const handleJobTypeToggle = (type: string) => {
        if (formData.jobType.includes(type)) handleChange('jobType', formData.jobType.filter((t) => t !== type));
        else handleChange('jobType', [...formData.jobType, type]);
    };

    const handleCompanySizePref = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, companySizePrefs: { ...prev.companySizePrefs, [key]: value } }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { handleChange('resumeFile', file); handleChange('resumeFileName', file.name); }
    };

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage(message); setToastType(type); setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
    };

    const validateTab = (tabId: string): Record<string, string> => {
        const errors: Record<string, string> = {};
        switch (tabId) {
            case 'resume':
                if (!formData.resumeFileName) errors.resumeFileName = 'Please upload your resume';
                if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';
                if (formData.skills.length === 0) errors.skills = 'Add at least one skill';
                break;
            case 'work-auth':
                if (!formData.workAuth) errors.workAuth = 'Work authorization is required';
                if (!formData.employmentType) errors.employmentType = 'Employment type is required';
                break;
            case 'job-prefs':
                if (formData.jobType.length === 0) errors.jobType = 'Select at least one job type';
                break;
            case 'location':
                if (!formData.country) errors.country = 'Country is required';
                if (!formData.state) errors.state = 'State/Region is required';
                break;
            case 'generic':
                if (!formData.firstName.trim()) errors.firstName = 'First name is required';
                if (!formData.fullLegalName.trim()) errors.fullLegalName = 'Legal name is required';
                if (!formData.phone.trim()) errors.phone = 'Phone number is required';
                if (formData.phone && formData.phone.length < 7) errors.phone = 'Enter a valid phone number';
                if (!formData.isOver18) errors.isOver18 = 'This field is required';
                if (!formData.legallyAuthorized) errors.legallyAuthorized = 'This field is required';
                break;
            case 'account':
                if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
                    if (!formData.currentPassword) errors.currentPassword = 'Current password is required';
                    if (!formData.newPassword) errors.newPassword = 'New password is required';
                    if (formData.newPassword && formData.newPassword.length < 8) errors.newPassword = 'Min 8 characters';
                    if (formData.newPassword && !/\d/.test(formData.newPassword)) errors.newPassword = 'Must include a number';
                    if (formData.newPassword && !/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)) errors.newPassword = 'Must include a special character';
                    if (formData.newPassword !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
                }
                break;
        }
        return errors;
    };

    const isTabComplete = (tabId: string): boolean =>
        Object.keys(validateTab(tabId)).length === 0 && savedTabs.has(tabId);

    const completionPercent = useMemo(() => {
        const tabIds = ['resume', 'work-auth', 'job-prefs', 'location', 'generic'];
        const completed = tabIds.filter((t) => savedTabs.has(t) && Object.keys(validateTab(t)).length === 0).length;
        return Math.round((completed / tabIds.length) * 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [savedTabs, formData]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await getCurrentUser();
                if (!user || user.role !== 'jobseeker' || !user.candidate_id) { setIsLoading(false); return; }
                setCandidateId(user.candidate_id);
                const res = await fetch(`${API_BASE}/profile/${user.candidate_id}`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    let gq_links = { linkedin: '', github: '', portfolio: '', other: '' };
                    try { if (data.gq_portfolio_links) gq_links = JSON.parse(data.gq_portfolio_links); } catch (e) { }
                    let gq_comp_size = { seed: '', small: '', medium: '', large: '' };
                    try { if (data.gq_company_size) gq_comp_size = JSON.parse(data.gq_company_size); } catch (e) { }

                    setFormData(prev => ({
                        ...prev,
                        jobTitle: data.title || '',
                        skills: data.key_skills ? data.key_skills.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
                        workAuth: data.work_authorization || '',
                        employmentType: data.employment_type || '',
                        jobType: data.job_type ? data.job_type.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
                        country: data.preferred_location || '',
                        state: data.state || '',
                        resumeFileName: data.resume_path ? data.resume_path.split('/').pop() : '',
                        education: data.education || data.gq_highest_education || '',
                        phone: data.phone || '',
                        firstName: data.gq_preferred_first_name || '',
                        fullLegalName: data.gq_full_legal_name || '',
                        address: data.gq_address || '',
                        address2: data.gq_address_2 || '',
                        city: data.gq_city || '',
                        zip: data.gq_zip_code || '',
                        stateProvince: data.gq_current_state || '',
                        countryField: data.gq_current_country || '',
                        coverLetter: data.gq_cover_letter || '',
                        jobFunction: data.gq_job_function || '',
                        willingToRelocate: data.gq_relocate || '',
                        equityPreference: data.gq_value_equity || '',
                        yearsExperience: data.gq_experience_years || '',
                        isOver18: data.gq_is_18_plus || '',
                        legallyAuthorized: data.gq_legally_authorized || '',
                        needSponsorship: data.gq_require_sponsorship || '',
                        isFullTimeStudent: data.gq_is_student || '',
                        salaryRequirement: data.gq_min_salary || '',
                        shortDescription: data.gq_short_phrase || '',
                        nextRoleDescription: data.gq_next_role_wants || '',
                        proudProject: data.gq_proud_project || '',
                        jobSearchStatus: data.gq_search_status || '',
                        linkedinUrl: gq_links.linkedin || '',
                        githubUrl: gq_links.github || '',
                        portfolioUrl: gq_links.portfolio || '',
                        otherUrl: gq_links.other || '',
                        portfolioPassword: data.gq_portfolio_password || '',
                        companySizePrefs: gq_comp_size,
                        gender: data.gq_gender || '',
                        race: data.gq_race || '',
                        veteranStatus: data.gq_veteran_status || '',
                    }));

                    const completed = new Set<string>();
                    if (data.title && data.key_skills) completed.add('resume');
                    if (data.work_authorization && data.employment_type) completed.add('work-auth');
                    if (data.job_type) completed.add('job-prefs');
                    if (data.preferred_location && data.state) completed.add('location');
                    setSavedTabs(completed);
                }
            } catch (err) {
                console.error("Failed to fetch profile", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        const errors = validateTab(activeTab);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            showToast(`Please add: ${Object.values(errors)[0]}`, 'error');
            return;
        }
        setFieldErrors({});
        if (!candidateId) { showToast('Unable to save: Profile not loaded completely', 'error'); return; }
        setIsSaving(true);
        const submitData = new FormData();
        submitData.append('candidate_id', candidateId.toString());

        if (activeTab === 'resume') {
            if (formData.resumeFile) submitData.append('resume', formData.resumeFile);
            submitData.append('title', formData.jobTitle);
            submitData.append('key_skills', formData.skills.join(', '));
        } else if (activeTab === 'work-auth') {
            submitData.append('work_authorization', formData.workAuth);
            submitData.append('employment_type', formData.employmentType);
        } else if (activeTab === 'job-prefs') {
            submitData.append('job_type', formData.jobType.join(', '));
        } else if (activeTab === 'location') {
            submitData.append('preferred_location', formData.country);
            submitData.append('state', formData.state);
        }

        try {
            const endpoint = activeTab === 'generic' ? `${API_BASE}/save-generic-questions` : `${API_BASE}/profile`;
            if (activeTab === 'generic') {
                submitData.append('phone', formData.phone);
                submitData.append('preferred_first_name', formData.firstName);
                submitData.append('full_legal_name', formData.fullLegalName);
                submitData.append('address', formData.address);
                submitData.append('address_2', formData.address2);
                submitData.append('city', formData.city);
                submitData.append('zip_code', formData.zip);
                submitData.append('gq_current_state', formData.stateProvince);
                submitData.append('gq_current_country', formData.countryField);
                submitData.append('cover_letter', formData.coverLetter);
                submitData.append('job_function', formData.jobFunction);
                submitData.append('relocate', formData.willingToRelocate);
                submitData.append('value_equity', formData.equityPreference);
                submitData.append('experience_years', formData.yearsExperience);
                submitData.append('is_18_plus', formData.isOver18);
                submitData.append('legally_authorized', formData.legallyAuthorized);
                submitData.append('require_sponsorship', formData.needSponsorship);
                submitData.append('is_student', formData.isFullTimeStudent);
                submitData.append('min_salary', formData.salaryRequirement);
                submitData.append('short_phrase', formData.shortDescription);
                submitData.append('next_role_wants', formData.nextRoleDescription);
                submitData.append('proud_project', formData.proudProject);
                submitData.append('search_status', formData.jobSearchStatus);
                submitData.append('portfolio_linkedin', formData.linkedinUrl);
                submitData.append('portfolio_github', formData.githubUrl);
                submitData.append('portfolio_url', formData.portfolioUrl);
                submitData.append('other_url', formData.otherUrl);
                submitData.append('portfolio_password', formData.portfolioPassword);
                submitData.append('highest_education', formData.education);
                submitData.append('comp_size_seed', formData.companySizePrefs['seed'] || '');
                submitData.append('comp_size_small', formData.companySizePrefs['small'] || '');
                submitData.append('comp_size_medium', formData.companySizePrefs['medium'] || '');
                submitData.append('comp_size_large', formData.companySizePrefs['large'] || '');
                submitData.append('gender', formData.gender);
                submitData.append('race', formData.race);
                submitData.append('veteran_status', formData.veteranStatus);
            }
            const res = await fetch(endpoint, { method: 'POST', credentials: 'include', body: submitData });
            if (res.ok) {
                setSavedTabs((prev) => new Set(prev).add(activeTab));
                showToast(`${tabs.find((t) => t.id === activeTab)?.label || 'Profile'} updated successfully!`);
            } else {
                const err = await res.json();
                showToast(err.error || 'Failed to update profile', 'error');
            }
        } catch (e) {
            showToast('Network error while saving profile', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAccountSave = async () => {
        const errors = validateTab('account');
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            showToast(`Please add: ${Object.values(errors)[0]}`, 'error');
            return;
        }
        setFieldErrors({});
        if (!candidateId) return;
        setIsSaving(true);
        const submitData = new FormData();
        submitData.append('candidate_id', candidateId.toString());
        submitData.append('action', 'update_password');
        submitData.append('current_password', formData.currentPassword);
        submitData.append('new_password', formData.newPassword);
        try {
            const res = await fetch(`${API_BASE}/profile`, { method: 'POST', credentials: 'include', body: submitData });
            if (res.ok) {
                showToast('Password updated successfully!');
                setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
            } else {
                const err = await res.json();
                showToast(err.error || 'Failed to update password', 'error');
            }
        } catch (e) {
            showToast('Network error while saving password', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    // ── Shared style tokens (compact) ──
    const inputClass = "w-full px-2.5 py-1.5 bg-slate-800/50 border border-slate-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 rounded-md text-white placeholder-slate-500 text-xs focus:outline-none transition-all";
    const selectClass = "w-full px-2.5 py-1.5 bg-slate-800/50 border border-slate-700/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 rounded-md text-white text-xs focus:outline-none transition-all appearance-none cursor-pointer";
    const labelClass = "block text-[11px] font-semibold text-slate-400 mb-1";
    const sectionClass = "bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 mb-4";
    const sectionTitleClass = "text-sm font-bold text-white mb-3 flex items-center gap-1.5";
    const saveBtn = "px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg text-white text-xs font-medium transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed";
    const toggleBtn = (active: boolean) =>
        `px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${active
            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
            : 'bg-slate-800/60 text-slate-400 border-slate-700/50 hover:border-slate-600'}`;

    const inputErr = (field: string) => fieldErrors[field]
        ? "w-full px-2.5 py-1.5 bg-slate-800/50 border border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-500/20 rounded-md text-white placeholder-slate-500 text-xs focus:outline-none transition-all"
        : inputClass;
    const selectErr = (field: string) => fieldErrors[field]
        ? "w-full px-2.5 py-1.5 bg-slate-800/50 border border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-500/20 rounded-md text-white text-xs focus:outline-none transition-all appearance-none cursor-pointer"
        : selectClass;

    const reqLabel = (text: string) => (
        <label className={labelClass}>{text} <span className="text-red-400">*</span></label>
    );
    const fieldError = (field: string) => fieldErrors[field]
        ? <p className="text-red-400 text-[10px] mt-0.5">{fieldErrors[field]}</p>
        : null;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-6 h-6 rounded-full border-2 border-slate-700/50 border-t-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-full">
            {/* Toast */}
            <AnimatePresence>
                {showSaveSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -40, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`fixed top-3 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 text-white rounded-lg shadow-xl flex items-center gap-2 text-sm ${toastType === 'error'
                            ? 'bg-gradient-to-r from-red-500 to-rose-500'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                    >
                        <span>{toastType === 'error' ? '⚠️' : '✅'}</span>
                        <span className="font-medium">{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full max-w-5xl mx-auto py-3 px-3">
                {/* Back */}
                <Link href="/dashboard"
                    className="inline-flex items-center gap-1.5 mb-3 px-3 py-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50 text-xs"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* ── Sidebar ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-52 flex-shrink-0"
                    >
                        <div className="lg:sticky lg:top-20">
                            <h2 className="text-base font-bold text-white mb-2">Profile Settings</h2>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] text-slate-400">Completion</span>
                                    <span className={`text-[10px] font-semibold ${completionPercent === 100 ? 'text-green-400' : 'text-blue-400'}`}>{completionPercent}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${completionPercent}%` }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className={`h-full rounded-full ${completionPercent === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400'}`}
                                    />
                                </div>
                            </div>

                            <nav className="space-y-0.5">
                                {tabs.map((tab) => (
                                    <motion.button
                                        key={tab.id}
                                        whileHover={{ x: 3 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => { setFieldErrors({}); setActiveTab(tab.id); }}
                                        className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === tab.id
                                            ? 'bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-transparent text-white border-l-2 border-blue-400'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/30'}`}
                                    >
                                        <span className="text-sm">{tab.icon}</span>
                                        <span className="flex-1 text-left">{tab.label}</span>
                                        {isTabComplete(tab.id) && <span className="text-green-400 text-xs">✓</span>}
                                    </motion.button>
                                ))}
                            </nav>
                        </div>
                    </motion.div>

                    {/* ── Main Content ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1 min-w-0"
                    >
                        <AnimatePresence mode="wait">

                            {/* ══ RESUME ══ */}
                            {activeTab === 'resume' && (
                                <motion.div key="resume"
                                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>📄 Resume Upload</h3>
                                        <p className="text-slate-500 text-[11px] mb-3">Upload a PDF or DOCX file under 5MB.</p>

                                        <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={handleFileUpload} className="hidden" />

                                        {formData.resumeFileName ? (
                                            <div className="flex items-center gap-3 p-2.5 bg-green-500/10 border border-green-500/20 rounded-lg mb-3">
                                                <div className="w-7 h-7 rounded-md bg-green-500/20 flex items-center justify-center text-sm">📎</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white font-medium text-xs truncate">{formData.resumeFileName}</p>
                                                    <p className="text-green-400 text-[10px]">Uploaded</p>
                                                </div>
                                                <button onClick={() => { handleChange('resumeFile', null); handleChange('resumeFileName', ''); }}
                                                    className="text-slate-400 hover:text-red-400 transition-colors flex-shrink-0">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-slate-500 text-xs mb-3">No file chosen</p>
                                        )}
                                        {fieldError('resumeFileName')}

                                        <div className="flex gap-2">
                                            <button onClick={() => fileInputRef.current?.click()} className={saveBtn}>Upload Resume</button>
                                            {formData.resumeFileName && (
                                                <button className="px-4 py-1.5 bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 rounded-lg text-white text-xs font-medium transition-all">
                                                    View
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>💼 Job Role & Skills</h3>
                                        <div className="space-y-4">
                                            <div>
                                                {reqLabel('Professional Title / Job Role')}
                                                <input type="text" value={formData.jobTitle} onChange={(e) => handleChange('jobTitle', e.target.value)}
                                                    placeholder="e.g. Software Engineer" className={inputErr('jobTitle')} />
                                                {fieldError('jobTitle')}
                                            </div>

                                            <div>
                                                {reqLabel('Key Skills')}
                                                {fieldError('skills')}
                                                <div className="flex gap-2 mb-2">
                                                    <input type="text" value={formData.skillInput}
                                                        onChange={(e) => handleChange('skillInput', e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
                                                        placeholder="Type a skill & press Enter" className={inputClass} />
                                                </div>

                                                {formData.skills.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                                        {formData.skills.map((skill) => (
                                                            <motion.span key={skill} initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-[11px] border border-blue-500/30">
                                                                {skill}
                                                                <button onClick={() => handleSkillRemove(skill)} className="hover:text-red-400 transition-colors leading-none">×</button>
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                )}

                                                <p className="text-[10px] text-slate-500 mb-1.5">Popular skills:</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {presetSkills.slice(0, 20).map((skill) => (
                                                        <button key={skill} onClick={() => handlePresetSkillToggle(skill)}
                                                            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all border ${formData.skills.includes(skill)
                                                                ? 'bg-blue-500/30 text-blue-300 border-blue-500/40'
                                                                : 'bg-slate-800/60 text-slate-400 border-slate-700/50 hover:border-slate-600'}`}>
                                                            {skill}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button onClick={handleSave} disabled={isSaving} className={saveBtn}>Save Resume</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ══ WORK AUTH ══ */}
                            {activeTab === 'work-auth' && (
                                <motion.div key="work-auth"
                                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>🛂 Work Authorization</h3>
                                        <div className="space-y-4">
                                            <div>
                                                {reqLabel('Work Authorization')}
                                                <select value={formData.workAuth} onChange={(e) => handleChange('workAuth', e.target.value)} className={selectErr('workAuth')}>
                                                    <option value="">Select Work Authorization</option>
                                                    {workAuthOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                                {fieldError('workAuth')}
                                            </div>
                                            <div>
                                                {reqLabel('Employment Type')}
                                                <select value={formData.employmentType} onChange={(e) => handleChange('employmentType', e.target.value)} className={selectErr('employmentType')}>
                                                    <option value="">Select employment type</option>
                                                    {employmentTypes.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                                {fieldError('employmentType')}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button onClick={handleSave} disabled={isSaving} className={saveBtn}>Save</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ══ JOB PREFS ══ */}
                            {activeTab === 'job-prefs' && (
                                <motion.div key="job-prefs"
                                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>💼 Job Preferences</h3>
                                        <div>
                                            {reqLabel('Job Types')}
                                            {fieldError('jobType')}
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                {jobTypes.map((type) => (
                                                    <button key={type} onClick={() => handleJobTypeToggle(type)}
                                                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${formData.jobType.includes(type)
                                                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-sm shadow-blue-500/10'
                                                            : 'bg-slate-800/60 text-slate-400 border-slate-700/50 hover:border-slate-600'}`}>
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button onClick={handleSave} disabled={isSaving} className={saveBtn}>Save Preferences</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ══ LOCATION ══ */}
                            {activeTab === 'location' && (
                                <motion.div key="location"
                                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>📍 Preferred Location</h3>
                                        <div className="space-y-4">
                                            <div>
                                                {reqLabel('Preferred Country/Region')}
                                                <select value={formData.country} onChange={(e) => handleChange('country', e.target.value)} className={selectErr('country')}>
                                                    <option value="">Select Preferred Location</option>
                                                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                                {fieldError('country')}
                                            </div>
                                            <div>
                                                {reqLabel('State / Region')}
                                                <select value={formData.state} onChange={(e) => handleChange('state', e.target.value)} className={selectErr('state')}>
                                                    <option value="">Select a state/region</option>
                                                    {usStates.map((s) => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                                {fieldError('state')}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button onClick={handleSave} disabled={isSaving} className={saveBtn}>Save</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ══ GENERIC QUESTIONS ══ */}
                            {activeTab === 'generic' && (
                                <motion.div key="generic"
                                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className="space-y-4"
                                >
                                    {/* Personal Info */}
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>👤 Personal Information</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                {reqLabel('Preferred First Name')}
                                                <input type="text" value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} className={inputErr('firstName')} />
                                                {fieldError('firstName')}
                                            </div>
                                            <div>
                                                {reqLabel('Full Legal Name')}
                                                <input type="text" value={formData.fullLegalName} onChange={(e) => handleChange('fullLegalName', e.target.value)} className={inputErr('fullLegalName')} />
                                                {fieldError('fullLegalName')}
                                            </div>
                                            <div>
                                                {reqLabel('Phone Number')}
                                                <input type="tel" value={formData.phone} onChange={(e) => handlePhoneChange(e.target.value)} placeholder="Digits only" className={inputErr('phone')} />
                                                {fieldError('phone')}
                                            </div>
                                            <div>
                                                <label className={labelClass}>Address</label>
                                                <input type="text" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Address 2</label>
                                                <input type="text" value={formData.address2} onChange={(e) => handleChange('address2', e.target.value)} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>City</label>
                                                <input type="text" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Zip/Postal Code</label>
                                                <input type="text" value={formData.zip} onChange={(e) => handleZipChange(e.target.value)} placeholder="Digits only" className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>State/Province</label>
                                                <select value={formData.stateProvince} onChange={(e) => handleChange('stateProvince', e.target.value)} className={selectClass}>
                                                    <option value="">Select...</option>
                                                    {usStates.map((s) => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Country</label>
                                                <select value={formData.countryField} onChange={(e) => handleChange('countryField', e.target.value)} className={selectClass}>
                                                    <option value="">Select...</option>
                                                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Documents & Links */}
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>📎 Documents & Links</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className={labelClass}>Cover Letter</label>
                                                <textarea value={formData.coverLetter} onChange={(e) => handleChange('coverLetter', e.target.value)}
                                                    placeholder="Paste your cover letter here..." rows={3}
                                                    className={`${inputClass} resize-none`} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className={labelClass}>LinkedIn URL</label>
                                                    <input type="url" value={formData.linkedinUrl} onChange={(e) => handleChange('linkedinUrl', e.target.value)} className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>GitHub URL</label>
                                                    <input type="url" value={formData.githubUrl} onChange={(e) => handleChange('githubUrl', e.target.value)} className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Portfolio URL</label>
                                                    <input type="url" value={formData.portfolioUrl} onChange={(e) => handleChange('portfolioUrl', e.target.value)} className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Other URL</label>
                                                    <input type="url" value={formData.otherUrl} onChange={(e) => handleChange('otherUrl', e.target.value)} className={inputClass} />
                                                </div>
                                            </div>
                                            <div className="sm:w-1/2">
                                                <label className={labelClass}>Portfolio Password (if applicable)</label>
                                                <input type="password" value={formData.portfolioPassword} onChange={(e) => handleChange('portfolioPassword', e.target.value)} className={inputClass} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Career Preferences */}
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>🎯 Career Preferences</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Job function</label>
                                                <select value={formData.jobFunction} onChange={(e) => handleChange('jobFunction', e.target.value)} className={selectClass}>
                                                    <option value="">Select a function...</option>
                                                    {jobFunctions.map((f) => <option key={f} value={f}>{f}</option>)}
                                                </select>
                                            </div>

                                            <div>
                                                <label className={labelClass}>Willing to relocate?</label>
                                                <div className="flex gap-2">
                                                    {['Yes', 'No'].map((opt) => (
                                                        <button key={opt} onClick={() => handleChange('willingToRelocate', opt)} className={toggleBtn(formData.willingToRelocate === opt)}>{opt}</button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Company Size Table */}
                                            <div>
                                                <label className={labelClass}>Preferred company size</label>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-xs">
                                                        <thead>
                                                            <tr className="text-slate-400">
                                                                <th className="text-left py-1.5 pr-3 font-medium w-28"></th>
                                                                <th className="py-1.5 px-2 font-medium text-green-400">Preferred</th>
                                                                <th className="py-1.5 px-2 font-medium text-yellow-400">OK</th>
                                                                <th className="py-1.5 px-2 font-medium text-red-400">No</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {companySizes.map((size) => (
                                                                <tr key={size.key} className="border-t border-slate-800/50">
                                                                    <td className="py-2 pr-3 text-slate-300 text-[11px]">{size.label}</td>
                                                                    {['preferred', 'ok', 'not-interested'].map((pref) => (
                                                                        <td key={pref} className="py-2 px-2 text-center">
                                                                            <button onClick={() => handleCompanySizePref(size.key, pref)}
                                                                                className={`w-4 h-4 rounded-full border-2 transition-all ${formData.companySizePrefs[size.key] === pref
                                                                                    ? 'bg-blue-500 border-blue-400'
                                                                                    : 'border-slate-600 hover:border-slate-400'}`} />
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            {/* Equity */}
                                            <div>
                                                <label className={labelClass}>Equity preference</label>
                                                <div className="space-y-1.5">
                                                    {[
                                                        "I'm not that interested in startup equity; I'd prefer a cash-heavy package",
                                                        "I'd be interested in getting some equity at a promising company",
                                                        "Equity is very important to me",
                                                    ].map((opt) => (
                                                        <button key={opt} onClick={() => handleChange('equityPreference', opt)}
                                                            className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all ${formData.equityPreference === opt
                                                                ? 'bg-blue-500/15 text-blue-300 border-blue-500/40'
                                                                : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-slate-600'}`}>
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Salary */}
                                            <div>
                                                <label className={labelClass}>Salary requirement</label>
                                                <div className="space-y-1.5">
                                                    {[
                                                        "Yes, I'm only interested in salaries at or above my minimum",
                                                        "I have a minimum in mind, but would consider offers below it for the right company",
                                                        "I'm flexible, or not sure what my requirements are yet",
                                                    ].map((opt) => (
                                                        <button key={opt} onClick={() => handleChange('salaryRequirement', opt)}
                                                            className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all ${formData.salaryRequirement === opt
                                                                ? 'bg-blue-500/15 text-blue-300 border-blue-500/40'
                                                                : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-slate-600'}`}>
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Search Status */}
                                            <div>
                                                <label className={labelClass}>Job search status</label>
                                                <div className="space-y-1.5">
                                                    {[
                                                        "I'm actively looking for a job",
                                                        "I'm open to new opportunities",
                                                        "I'm not looking / not ready. HIDE MY PROFILE.",
                                                    ].map((opt) => (
                                                        <button key={opt} onClick={() => handleChange('jobSearchStatus', opt)}
                                                            className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all ${formData.jobSearchStatus === opt
                                                                ? 'bg-blue-500/15 text-blue-300 border-blue-500/40'
                                                                : 'bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-slate-600'}`}>
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Experience */}
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>🎓 Experience & Education</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className={labelClass}>Highest Education Level</label>
                                                <select value={formData.education} onChange={(e) => handleChange('education', e.target.value)} className={selectClass}>
                                                    <option value="">Select...</option>
                                                    {educationLevels.map((e) => <option key={e} value={e}>{e}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Years of Professional Experience</label>
                                                <select value={formData.yearsExperience} onChange={(e) => handleChange('yearsExperience', e.target.value)} className={selectClass}>
                                                    <option value="">Select...</option>
                                                    {experienceYears.map((y) => <option key={y} value={y}>{y}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Full-time student?</label>
                                                <div className="flex gap-2">
                                                    {['Yes', 'No'].map((opt) => (
                                                        <button key={opt} onClick={() => handleChange('isFullTimeStudent', opt)} className={toggleBtn(formData.isFullTimeStudent === opt)}>{opt}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Demographics */}
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>📋 Demographics & Legal</h3>
                                        <p className="text-slate-500 text-[10px] mb-3">Voluntary and confidential — won&apos;t affect applications.</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                {reqLabel('18 years or older?')}
                                                {fieldError('isOver18')}
                                                <div className="flex gap-2">
                                                    {['Yes', 'No'].map((opt) => (
                                                        <button key={opt} onClick={() => handleChange('isOver18', opt)} className={toggleBtn(formData.isOver18 === opt)}>{opt}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                {reqLabel('Legally authorized to work?')}
                                                {fieldError('legallyAuthorized')}
                                                <div className="flex gap-2">
                                                    {['Yes', 'No'].map((opt) => (
                                                        <button key={opt} onClick={() => handleChange('legallyAuthorized', opt)} className={toggleBtn(formData.legallyAuthorized === opt)}>{opt}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className={labelClass}>Require sponsorship?</label>
                                                <div className="flex gap-2">
                                                    {['Yes', 'No'].map((opt) => (
                                                        <button key={opt} onClick={() => handleChange('needSponsorship', opt)} className={toggleBtn(formData.needSponsorship === opt)}>{opt}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Story */}
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>✨ Your Story</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className={labelClass}>Describe yourself in a short phrase</label>
                                                <input type="text" value={formData.shortDescription} onChange={(e) => handleChange('shortDescription', e.target.value)}
                                                    placeholder='e.g., "ML engineer from Twitter"' className={inputClass} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>What are you looking for in your next role?</label>
                                                <textarea value={formData.nextRoleDescription} onChange={(e) => handleChange('nextRoleDescription', e.target.value)}
                                                    placeholder="Technologies, team size, culture, remote policy, etc." rows={2}
                                                    className={`${inputClass} resize-none`} />
                                            </div>
                                            <div>
                                                <label className={labelClass}>A project you&apos;re proud of (optional)</label>
                                                <textarea value={formData.proudProject} onChange={(e) => handleChange('proudProject', e.target.value)}
                                                    placeholder="Include your contribution and impact" rows={2}
                                                    className={`${inputClass} resize-none`} />
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button onClick={handleSave} disabled={isSaving} className={saveBtn}>Save Profile</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ══ ACCOUNT ══ */}
                            {activeTab === 'account' && (
                                <motion.div key="account"
                                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className={sectionClass}>
                                        <h3 className={sectionTitleClass}>⚙️ Account Settings</h3>
                                        <div className="space-y-3 max-w-sm">
                                            <div>
                                                {reqLabel('Current Password')}
                                                <input type="password" value={formData.currentPassword} onChange={(e) => handleChange('currentPassword', e.target.value)}
                                                    placeholder="Enter current password" className={inputErr('currentPassword')} />
                                                {fieldError('currentPassword')}
                                            </div>
                                            <div>
                                                {reqLabel('New Password')}
                                                <input type="password" value={formData.newPassword} onChange={(e) => handleChange('newPassword', e.target.value)}
                                                    placeholder="Enter new password" className={inputErr('newPassword')} />
                                                {fieldError('newPassword')}
                                                <p className="text-[10px] text-slate-500 mt-1">Min 8 chars, include a number and a special character.</p>
                                            </div>
                                            <div>
                                                {reqLabel('Confirm Password')}
                                                <input type="password" value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                                    placeholder="Confirm new password" className={inputErr('confirmPassword')} />
                                                {fieldError('confirmPassword')}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button onClick={handleAccountSave} disabled={isSaving} className={saveBtn}>Update Password</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}