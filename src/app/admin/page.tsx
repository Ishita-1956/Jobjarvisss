'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════
interface Job {
    id: number;
    created_at: string;
    candidate_name: string;
    candidate_id: number;
    candidate_status: string;
    title: string;
    company: string;
    source: string;
    status: string;
    comment: string;
    link: string;
    resume_available: boolean;
}

interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    title: string;
    key_skills: string;
    preferred_location: string;
    work_authorization: string;
    employment_type: string;
    salary_expectations: string;
    education: string;
    experience_years: string;
    search_status: string;
    dice_active: boolean;
    yc_active: boolean;
    job_jarvis_active: boolean;
}

interface Enterprise {
    id: number;
    name: string;
    email: string;
    company: string;
    location: string;
    recruiters: number;
    candidates: number;
    jobs_posted: number;
    status: string;
    joined: string;
}

// ═══════════════════════════════════════════════════════════
//  MOCK DATA
// ═══════════════════════════════════════════════════════════
const STATUSES = ['queued', 'Applied', 'interview', 'rejected', 'selected', 'on_hold'];
const SOURCES = ['Dice', 'LinkedIn', 'Indeed', 'YCombinator', 'Glassdoor'];

const MOCK_JOBS: Job[] = Array.from({ length: 42 }, (_, i) => ({
    id: 4180 - i,
    created_at: `2026-02-${String(16 - Math.floor(i / 6)).padStart(2, '0')} ${String(20 - (i % 5)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
    candidate_name: ['Anudeep', 'Priya Sharma', 'Rahul Verma', 'Sarah Chen', 'Alex Johnson', 'Maria Garcia'][i % 6],
    candidate_id: (i % 6) + 1,
    candidate_status: 'Ready',
    title: [
        'Web Tester with Payments/Banking Domain Experience',
        'IT - Clemson University - Quality Assurance Analyst - Advanced',
        'Mainframe Tester//12+ Months Contract//Remote Work',
        'SAP QA/Tester',
        'Facets Claims Tester / QA Analyst',
        'Senior Software Engineer - Full Stack',
        'DevOps Engineer - Cloud Infrastructure',
        'Data Scientist - Machine Learning',
        'React Developer - Frontend',
        'Python Backend Developer',
    ][i % 10],
    company: [
        'People Force Consulting Inc',
        'Masqath Technologies LLC',
        'Golden Resources, Inc.',
        'FutureTech Consultants LLC',
        'Siri Infosolutions Inc',
        'Vector Consulting, Inc',
        'CloudStack Solutions',
        'DataPrime Analytics',
    ][i % 8],
    source: SOURCES[i % 5],
    status: STATUSES[i % 6],
    comment: '',
    link: 'https://example.com/job/' + (4180 - i),
    resume_available: i % 3 !== 0,
}));

const MOCK_CANDIDATES: Candidate[] = [
    { id: 1, name: 'Anudeep', email: 'anudeep@gmail.com', phone: '+1-555-0101', title: 'QA Engineer', key_skills: 'Selenium, Java, API Testing, JIRA', preferred_location: 'Remote', work_authorization: 'US Citizen', employment_type: 'Full-time', salary_expectations: '$90,000 - $110,000', education: 'B.Tech Computer Science', experience_years: '5', search_status: 'Actively Looking', dice_active: true, yc_active: false, job_jarvis_active: true },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@gmail.com', phone: '+1-555-0102', title: 'Full Stack Developer', key_skills: 'React, Node.js, Python, AWS', preferred_location: 'San Francisco, CA', work_authorization: 'H1B', employment_type: 'Full-time', salary_expectations: '$120,000 - $150,000', education: 'M.S. Computer Science', experience_years: '7', search_status: 'Open to Offers', dice_active: true, yc_active: true, job_jarvis_active: true },
    { id: 3, name: 'Rahul Verma', email: 'rahul.v@gmail.com', phone: '+1-555-0103', title: 'Data Scientist', key_skills: 'Python, TensorFlow, SQL, Spark', preferred_location: 'New York, NY', work_authorization: 'Green Card', employment_type: 'Full-time', salary_expectations: '$130,000 - $160,000', education: 'Ph.D. Data Science', experience_years: '6', search_status: 'Actively Looking', dice_active: false, yc_active: true, job_jarvis_active: true },
    { id: 4, name: 'Sarah Chen', email: 'sarah.chen@gmail.com', phone: '+1-555-0104', title: 'DevOps Engineer', key_skills: 'Kubernetes, Docker, Terraform, CI/CD', preferred_location: 'Seattle, WA', work_authorization: 'US Citizen', employment_type: 'Contract', salary_expectations: '$140,000 - $170,000', education: 'B.S. Computer Engineering', experience_years: '8', search_status: 'Passively Looking', dice_active: true, yc_active: false, job_jarvis_active: false },
    { id: 5, name: 'Alex Johnson', email: 'alex.j@gmail.com', phone: '+1-555-0105', title: 'Frontend Developer', key_skills: 'React, TypeScript, Next.js, CSS', preferred_location: 'Austin, TX', work_authorization: 'US Citizen', employment_type: 'Full-time', salary_expectations: '$100,000 - $130,000', education: 'B.S. Software Engineering', experience_years: '4', search_status: 'Actively Looking', dice_active: true, yc_active: true, job_jarvis_active: true },
    { id: 6, name: 'Maria Garcia', email: 'maria.g@gmail.com', phone: '+1-555-0106', title: 'Backend Engineer', key_skills: 'Java, Spring Boot, PostgreSQL, Redis', preferred_location: 'Chicago, IL', work_authorization: 'OPT', employment_type: 'Full-time', salary_expectations: '$110,000 - $140,000', education: 'M.S. Information Systems', experience_years: '5', search_status: 'Open to Offers', dice_active: false, yc_active: false, job_jarvis_active: true },
];

const MOCK_ENTERPRISES: Enterprise[] = [
    { id: 1, name: 'John Mitchell', email: 'john@peopleforce.com', company: 'People Force Consulting Inc', location: 'Dallas, TX', recruiters: 4, candidates: 18, jobs_posted: 52, status: 'Active', joined: '2025-11-15' },
    { id: 2, name: 'Lisa Wang', email: 'lisa@masqath.com', company: 'Masqath Technologies LLC', location: 'San Jose, CA', recruiters: 2, candidates: 12, jobs_posted: 34, status: 'Active', joined: '2025-12-03' },
    { id: 3, name: 'David Brown', email: 'david@goldenresources.com', company: 'Golden Resources, Inc.', location: 'New York, NY', recruiters: 3, candidates: 22, jobs_posted: 67, status: 'Active', joined: '2026-01-10' },
    { id: 4, name: 'Emily Rodriguez', email: 'emily@futuretech.com', company: 'FutureTech Consultants LLC', location: 'Austin, TX', recruiters: 1, candidates: 8, jobs_posted: 19, status: 'Inactive', joined: '2026-01-22' },
    { id: 5, name: 'Mike Thompson', email: 'mike@vectorconsulting.com', company: 'Vector Consulting, Inc', location: 'Chicago, IL', recruiters: 5, candidates: 30, jobs_posted: 88, status: 'Active', joined: '2025-10-28' },
];

// ═══════════════════════════════════════════════════════════
//  ICONS (inline SVG)
// ═══════════════════════════════════════════════════════════
const Icons = {
    dashboard: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
    ),
    briefcase: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
    ),
    users: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
    ),
    building: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" /></svg>
    ),
    search: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
    ),
    chevron: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
    ),
    externalLink: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
    ),
    download: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
    ),
    file: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
    ),
    close: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
    ),
    edit: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
    ),
    trash: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
    ),
    refresh: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" /></svg>
    ),
    plus: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
    ),
};

// ═══════════════════════════════════════════════════════════
//  SIDEBAR TABS
// ═══════════════════════════════════════════════════════════
type Tab = 'overview' | 'jobs' | 'candidates' | 'enterprises';

const SIDEBAR_ITEMS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: Icons.dashboard },
    { key: 'jobs', label: 'Jobs', icon: Icons.briefcase },
    { key: 'candidates', label: 'Candidates', icon: Icons.users },
    { key: 'enterprises', label: 'Enterprises', icon: Icons.building },
];

// ═══════════════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════════════
export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sourceFilter, setSourceFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
    const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
    const [enterprises, setEnterprises] = useState<Enterprise[]>(MOCK_ENTERPRISES);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [editComment, setEditComment] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [editingEnterprise, setEditingEnterprise] = useState<Enterprise | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'candidate' | 'enterprise'; id: number } | null>(null);
    const [showCreateJob, setShowCreateJob] = useState(false);
    const PER_PAGE = 15;

    // ─── Filtered data ────────────────────────────────────
    const filteredJobs = useMemo(() => {
        return jobs.filter((j) => {
            if (searchQuery && !j.candidate_name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (statusFilter !== 'all' && j.status !== statusFilter) return false;
            if (sourceFilter !== 'all' && j.source !== sourceFilter) return false;
            return true;
        });
    }, [jobs, searchQuery, statusFilter, sourceFilter]);

    const totalPages = Math.ceil(filteredJobs.length / PER_PAGE);
    const paginatedJobs = filteredJobs.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    // ─── Handlers ─────────────────────────────────────────
    const handleStatusChange = useCallback((jobId: number, newStatus: string) => {
        setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)));
    }, []);

    const handleDeleteJob = useCallback((jobId: number) => {
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
    }, []);

    const handleSaveComment = useCallback(() => {
        if (!editingJob) return;
        setJobs((prev) => prev.map((j) => (j.id === editingJob.id ? { ...j, comment: editComment } : j)));
        setEditingJob(null);
        setEditComment('');
    }, [editingJob, editComment]);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => {
            setJobs([...MOCK_JOBS]);
            setSearchQuery('');
            setStatusFilter('all');
            setSourceFilter('all');
            setCurrentPage(1);
            setIsRefreshing(false);
        }, 800);
    }, []);

    const handleCreateJob = useCallback((newJob: Omit<Job, 'id' | 'created_at' | 'candidate_status' | 'resume_available'>) => {
        const job: Job = {
            ...newJob,
            id: Math.max(...jobs.map(j => j.id), 0) + 1,
            created_at: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().slice(0, 5),
            candidate_status: 'Ready',
            resume_available: false,
        };
        setJobs((prev) => [job, ...prev]);
        setShowCreateJob(false);
    }, [jobs]);

    const openCandidateModal = useCallback((candidateId: number) => {
        const cand = candidates.find((c) => c.id === candidateId);
        if (cand) setSelectedCandidate(cand);
    }, [candidates]);

    const openCommentModal = useCallback((job: Job) => {
        setEditingJob(job);
        setEditComment(job.comment);
    }, []);

    const handleSaveCandidate = useCallback((updated: Candidate) => {
        setCandidates((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setSelectedCandidate(null);
    }, []);

    const handleDeleteCandidate = useCallback((id: number) => {
        setCandidates((prev) => prev.filter((c) => c.id !== id));
        setSelectedCandidate(null);
        setDeleteConfirm(null);
    }, []);

    const handleSaveEnterprise = useCallback((updated: Enterprise) => {
        setEnterprises((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
        setEditingEnterprise(null);
    }, []);

    const handleDeleteEnterprise = useCallback((id: number) => {
        setEnterprises((prev) => prev.filter((e) => e.id !== id));
        setEditingEnterprise(null);
        setDeleteConfirm(null);
    }, []);

    // ─── Stats ────────────────────────────────────────────
    const stats = useMemo(() => ({
        totalJobs: jobs.length,
        totalCandidates: candidates.length,
        totalEnterprises: enterprises.length,
        activeJobs: jobs.filter((j) => j.status === 'Applied' || j.status === 'queued').length,
    }), [jobs, candidates, enterprises]);

    // ═══════════════════════════════════════════════════════
    //  RENDER
    // ═══════════════════════════════════════════════════════
    return (
        <div className="admin-root">
            {/* ═══ HEADER ═══ */}
            <header className="admin-header">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="admin-brand"
                >
                    JobJarvis Admin
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="admin-header-label"
                >
                    Admin Dashboard
                </motion.div>
            </header>

            <div className="admin-body">
                {/* ═══ SIDEBAR ═══ */}
                <nav className="admin-sidebar">
                    {SIDEBAR_ITEMS.map((item, i) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.06 }}
                            className={`admin-sidebar-item ${activeTab === item.key ? 'active' : ''}`}
                            onClick={() => { setActiveTab(item.key); setCurrentPage(1); }}
                        >
                            <span className="icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </motion.div>
                    ))}
                </nav>

                {/* ═══ CONTENT ═══ */}
                <main className="admin-content">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div key="overview" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                <OverviewView stats={stats} onNavigate={setActiveTab} />
                            </motion.div>
                        )}
                        {activeTab === 'jobs' && (
                            <motion.div key="jobs" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                <JobsView
                                    jobs={paginatedJobs}
                                    totalJobs={filteredJobs.length}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    searchQuery={searchQuery}
                                    statusFilter={statusFilter}
                                    sourceFilter={sourceFilter}
                                    isRefreshing={isRefreshing}
                                    onSearch={setSearchQuery}
                                    onStatusFilter={setStatusFilter}
                                    onSourceFilter={setSourceFilter}
                                    onPageChange={setCurrentPage}
                                    onStatusChange={handleStatusChange}
                                    onDelete={handleDeleteJob}
                                    onOpenCandidate={openCandidateModal}
                                    onOpenComment={openCommentModal}
                                    onRefresh={handleRefresh}
                                    onCreateJob={() => setShowCreateJob(true)}
                                />
                            </motion.div>
                        )}
                        {activeTab === 'candidates' && (
                            <motion.div key="candidates" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                <CandidatesView candidates={candidates} onOpenCandidate={(c) => setSelectedCandidate(c)} onDeleteCandidate={(id) => setDeleteConfirm({ type: 'candidate', id })} />
                            </motion.div>
                        )}
                        {activeTab === 'enterprises' && (
                            <motion.div key="enterprises" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                <EnterprisesView enterprises={enterprises} onEditEnterprise={(e) => setEditingEnterprise(e)} onDeleteEnterprise={(id) => setDeleteConfirm({ type: 'enterprise', id })} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* ═══ CANDIDATE DETAIL MODAL ═══ */}
            <AnimatePresence>
                {selectedCandidate && (
                    <CandidateModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} onSave={handleSaveCandidate} onDelete={(id) => setDeleteConfirm({ type: 'candidate', id })} />
                )}
            </AnimatePresence>

            {/* ═══ ENTERPRISE EDIT MODAL ═══ */}
            <AnimatePresence>
                {editingEnterprise && (
                    <EnterpriseModal enterprise={editingEnterprise} onClose={() => setEditingEnterprise(null)} onSave={handleSaveEnterprise} onDelete={(id) => setDeleteConfirm({ type: 'enterprise', id })} />
                )}
            </AnimatePresence>

            {/* ═══ DELETE CONFIRMATION MODAL ═══ */}
            <AnimatePresence>
                {deleteConfirm && (
                    <DeleteConfirmModal
                        type={deleteConfirm.type}
                        onConfirm={() => deleteConfirm.type === 'candidate' ? handleDeleteCandidate(deleteConfirm.id) : handleDeleteEnterprise(deleteConfirm.id)}
                        onCancel={() => setDeleteConfirm(null)}
                    />
                )}
            </AnimatePresence>

            {/* ═══ EDIT COMMENT MODAL ═══ */}
            <AnimatePresence>
                {editingJob && (
                    <CommentModal
                        job={editingJob}
                        comment={editComment}
                        onChange={setEditComment}
                        onSave={handleSaveComment}
                        onClose={() => { setEditingJob(null); setEditComment(''); }}
                    />
                )}
            </AnimatePresence>

            {/* ═══ CREATE JOB MODAL ═══ */}
            <AnimatePresence>
                {showCreateJob && (
                    <CreateJobModal onClose={() => setShowCreateJob(false)} onCreate={handleCreateJob} />
                )}
            </AnimatePresence>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
//  OVERVIEW VIEW
// ═══════════════════════════════════════════════════════════
function OverviewView({ stats, onNavigate }: { stats: { totalJobs: number; totalCandidates: number; totalEnterprises: number; activeJobs: number }; onNavigate: (t: Tab) => void }) {
    const cards = [
        { label: 'Total Jobs', value: stats.totalJobs, gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)', tab: 'jobs' as Tab },
        { label: 'Active Jobs', value: stats.activeJobs, gradient: 'linear-gradient(135deg, #10b981, #059669)', tab: 'jobs' as Tab },
        { label: 'Candidates', value: stats.totalCandidates, gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', tab: 'candidates' as Tab },
        { label: 'Enterprises', value: stats.totalEnterprises, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', tab: 'enterprises' as Tab },
    ];

    return (
        <div>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '1.5rem' }}
            >
                Dashboard Overview
            </motion.h2>

            <div className="admin-stats">
                {cards.map((c, i) => (
                    <motion.div
                        key={c.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="admin-stat-card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => onNavigate(c.tab)}
                    >
                        <div className="admin-stat-value" style={{ background: c.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {c.value}
                        </div>
                        <div className="admin-stat-label">{c.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    background: 'rgba(15, 15, 36, 0.6)',
                    border: '1px solid rgba(148, 163, 184, 0.08)',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    backdropFilter: 'blur(12px)',
                }}
            >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '1rem' }}>
                    Recent Activity
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {MOCK_JOBS.slice(0, 5).map((j, i) => (
                        <motion.div
                            key={j.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.06 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.65rem 0.85rem',
                                background: 'rgba(5, 5, 16, 0.4)',
                                borderRadius: '0.6rem',
                                border: '1px solid rgba(148, 163, 184, 0.05)',
                            }}
                        >
                            <div>
                                <span style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.82rem' }}>#{j.id}</span>
                                <span style={{ color: '#64748b', margin: '0 0.5rem' }}>·</span>
                                <span style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{j.candidate_name}</span>
                                <span style={{ color: '#64748b', margin: '0 0.5rem' }}>→</span>
                                <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{j.title.substring(0, 40)}{j.title.length > 40 ? '...' : ''}</span>
                            </div>
                            <StatusBadge status={j.status} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
//  JOBS VIEW
// ═══════════════════════════════════════════════════════════
interface JobsViewProps {
    jobs: Job[];
    totalJobs: number;
    currentPage: number;
    totalPages: number;
    searchQuery: string;
    statusFilter: string;
    sourceFilter: string;
    isRefreshing: boolean;
    onSearch: (v: string) => void;
    onStatusFilter: (v: string) => void;
    onSourceFilter: (v: string) => void;
    onPageChange: (p: number) => void;
    onStatusChange: (id: number, s: string) => void;
    onDelete: (id: number) => void;
    onOpenCandidate: (id: number) => void;
    onOpenComment: (j: Job) => void;
    onRefresh: () => void;
    onCreateJob: () => void;
}

function JobsView({
    jobs, totalJobs, currentPage, totalPages, searchQuery, statusFilter, sourceFilter, isRefreshing,
    onSearch, onStatusFilter, onSourceFilter, onPageChange, onStatusChange, onDelete, onOpenCandidate, onOpenComment, onRefresh, onCreateJob,
}: JobsViewProps) {
    return (
        <div>
            {/* Filter Bar */}
            <div className="admin-filter-bar">
                <div className="admin-filter-group">
                    <label>Search Candidate</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            placeholder="e.g. Anudeep"
                            value={searchQuery}
                            onChange={(e) => { onSearch(e.target.value); onPageChange(1); }}
                        />
                    </div>
                </div>
                <div className="admin-filter-group">
                    <label>Platform (Source)</label>
                    <select value={sourceFilter} onChange={(e) => { onSourceFilter(e.target.value); onPageChange(1); }}>
                        <option value="all">All Platforms</option>
                        {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="admin-filter-group">
                    <label>Status</label>
                    <select value={statusFilter} onChange={(e) => { onStatusFilter(e.target.value); onPageChange(1); }}>
                        <option value="all">All Statuses</option>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="admin-filter-actions">
                    <button className="btn-admin-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }} onClick={onCreateJob}>
                        {Icons.plus} Create Job
                    </button>
                    <motion.button
                        className="btn-admin-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                        onClick={onRefresh}
                        animate={isRefreshing ? { rotate: 360 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        {Icons.refresh} Refresh
                    </motion.button>
                </div>
            </div>

            {/* Table */}
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Candidate</th>
                            <th>Role &amp; Company</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Reason / Comment</th>
                            <th>Links</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {jobs.map((job, i) => (
                                <motion.tr
                                    key={job.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.25, delay: i * 0.03 }}
                                >
                                    <td className="col-id">#{job.id}</td>
                                    <td className="col-date">{job.created_at}</td>
                                    <td>
                                        <span className="candidate-link" onClick={() => onOpenCandidate(job.candidate_id)}>
                                            {job.candidate_name}
                                        </span>
                                        <div className="candidate-sub" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <span style={{ color: '#10b981', fontSize: '0.68rem', fontWeight: 600 }}>{job.candidate_status}</span>
                                            <span style={{ color: '#475569' }}>·</span>
                                            <span>ID: {job.candidate_id}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="col-role-title">{job.title}</div>
                                        <div className="col-role-company">{job.company}</div>
                                    </td>
                                    <td style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{job.source}</td>
                                    <td>
                                        <select
                                            className="status-select"
                                            value={job.status}
                                            onChange={(e) => onStatusChange(job.id, e.target.value)}
                                        >
                                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                    <td>
                                        <button className="comment-toggle" onClick={() => onOpenComment(job)}>
                                            {Icons.chevron}
                                            <span style={{ marginLeft: '0.3rem', fontSize: '0.78rem' }}>
                                                {job.comment ? job.comment.substring(0, 20) + '...' : '—'}
                                            </span>
                                        </button>
                                    </td>
                                    <td>
                                        <div className="admin-links">
                                            <a className="admin-link" href={job.link} target="_blank" rel="noopener noreferrer">
                                                {Icons.externalLink} Job Link
                                            </a>
                                            {job.resume_available && (
                                                <>
                                                    <span className="admin-link" style={{ cursor: 'pointer' }}>
                                                        {Icons.file} Resume
                                                    </span>
                                                    <span className="admin-link" style={{ cursor: 'pointer' }}>
                                                        {Icons.download} Download
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                                            <button className="btn-admin-danger" onClick={() => onDelete(job.id)} title="Delete Job">
                                                {Icons.trash}
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {jobs.length === 0 && (
                    <div className="admin-empty">No jobs match your filters.</div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="admin-pagination">
                        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>← Prev</button>
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                            let page: number;
                            if (totalPages <= 7) {
                                page = i + 1;
                            } else if (currentPage <= 4) {
                                page = i + 1;
                            } else if (currentPage >= totalPages - 3) {
                                page = totalPages - 6 + i;
                            } else {
                                page = currentPage - 3 + i;
                            }
                            return (
                                <button
                                    key={page}
                                    className={currentPage === page ? 'active-page' : ''}
                                    onClick={() => onPageChange(page)}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <span className="page-info">{totalJobs} total</span>
                        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next →</button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
//  CANDIDATES VIEW
// ═══════════════════════════════════════════════════════════
function CandidatesView({ candidates, onOpenCandidate, onDeleteCandidate }: { candidates: Candidate[]; onOpenCandidate: (c: Candidate) => void; onDeleteCandidate: (id: number) => void }) {
    const [search, setSearch] = useState('');

    const filtered = candidates.filter((c) =>
        !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f1f5f9' }}>All Candidates</h2>
                <div className="admin-filter-group">
                    <input
                        placeholder="Search candidates..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ minWidth: '240px' }}
                    />
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Title</th>
                            <th>Skills</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Platforms</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((c, i) => (
                            <motion.tr
                                key={c.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <td className="col-id">#{c.id}</td>
                                <td>
                                    <span className="candidate-link" onClick={() => onOpenCandidate(c)}>{c.name}</span>
                                </td>
                                <td style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>{c.email}</td>
                                <td style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 500 }}>{c.title}</td>
                                <td style={{ fontSize: '0.82rem', color: '#cbd5e1', maxWidth: '200px' }}>
                                    {c.key_skills.substring(0, 40)}{c.key_skills.length > 40 ? '...' : ''}
                                </td>
                                <td style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>{c.preferred_location}</td>
                                <td>
                                    <StatusBadge status={c.search_status} />
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                                        {c.dice_active && <PlatformBadge name="Dice" />}
                                        {c.yc_active && <PlatformBadge name="YC" />}
                                        {c.job_jarvis_active && <PlatformBadge name="JJ" />}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        <button
                                            className="btn-admin-edit"
                                            onClick={() => onOpenCandidate(c)}
                                        >
                                            {Icons.edit} Edit
                                        </button>
                                        <button className="btn-admin-danger" onClick={() => onDeleteCandidate(c.id)} title="Delete">
                                            {Icons.trash}
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
//  ENTERPRISES VIEW
// ═══════════════════════════════════════════════════════════
function EnterprisesView({ enterprises, onEditEnterprise, onDeleteEnterprise }: { enterprises: Enterprise[]; onEditEnterprise: (e: Enterprise) => void; onDeleteEnterprise: (id: number) => void }) {
    const [search, setSearch] = useState('');

    const filtered = enterprises.filter((e) =>
        !search || e.company.toLowerCase().includes(search.toLowerCase()) || e.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f1f5f9' }}>Enterprise Partners</h2>
                <div className="admin-filter-group">
                    <input
                        placeholder="Search enterprises..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ minWidth: '240px' }}
                    />
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Contact</th>
                            <th>Company</th>
                            <th>Location</th>
                            <th>Recruiters</th>
                            <th>Candidates</th>
                            <th>Jobs Posted</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((e, i) => (
                            <motion.tr
                                key={e.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <td className="col-id">#{e.id}</td>
                                <td>
                                    <div style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.85rem' }}>{e.name}</div>
                                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{e.email}</div>
                                </td>
                                <td style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.85rem' }}>{e.company}</td>
                                <td style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>{e.location}</td>
                                <td style={{ textAlign: 'center', fontSize: '0.88rem', fontWeight: 600, color: '#60a5fa' }}>{e.recruiters}</td>
                                <td style={{ textAlign: 'center', fontSize: '0.88rem', fontWeight: 600, color: '#a78bfa' }}>{e.candidates}</td>
                                <td style={{ textAlign: 'center', fontSize: '0.88rem', fontWeight: 600, color: '#34d399' }}>{e.jobs_posted}</td>
                                <td><StatusBadge status={e.status} /></td>
                                <td className="col-date">{e.joined}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        <button className="btn-admin-edit" onClick={() => onEditEnterprise(e)}>
                                            {Icons.edit} Edit
                                        </button>
                                        <button className="btn-admin-danger" onClick={() => onDeleteEnterprise(e.id)} title="Delete">
                                            {Icons.trash}
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
//  STATUS BADGE
// ═══════════════════════════════════════════════════════════
function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
        queued: { bg: 'rgba(234,179,8,0.1)', text: '#facc15', border: 'rgba(234,179,8,0.2)' },
        Applied: { bg: 'rgba(59,130,246,0.1)', text: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
        interview: { bg: 'rgba(139,92,246,0.1)', text: '#a78bfa', border: 'rgba(139,92,246,0.2)' },
        rejected: { bg: 'rgba(239,68,68,0.1)', text: '#f87171', border: 'rgba(239,68,68,0.2)' },
        selected: { bg: 'rgba(16,185,129,0.1)', text: '#34d399', border: 'rgba(16,185,129,0.2)' },
        on_hold: { bg: 'rgba(148,163,184,0.1)', text: '#94a3b8', border: 'rgba(148,163,184,0.2)' },
        Active: { bg: 'rgba(16,185,129,0.1)', text: '#34d399', border: 'rgba(16,185,129,0.2)' },
        Inactive: { bg: 'rgba(148,163,184,0.1)', text: '#94a3b8', border: 'rgba(148,163,184,0.2)' },
        'Actively Looking': { bg: 'rgba(16,185,129,0.1)', text: '#34d399', border: 'rgba(16,185,129,0.2)' },
        'Open to Offers': { bg: 'rgba(59,130,246,0.1)', text: '#60a5fa', border: 'rgba(59,130,246,0.2)' },
        'Passively Looking': { bg: 'rgba(234,179,8,0.1)', text: '#facc15', border: 'rgba(234,179,8,0.2)' },
    };

    const c = colors[status] || colors['on_hold'];

    return (
        <span style={{
            display: 'inline-block',
            padding: '0.2rem 0.55rem',
            borderRadius: '0.35rem',
            fontSize: '0.72rem',
            fontWeight: 600,
            background: c.bg,
            color: c.text,
            border: `1px solid ${c.border}`,
        }}>
            {status}
        </span>
    );
}

// ═══════════════════════════════════════════════════════════
//  PLATFORM BADGE
// ═══════════════════════════════════════════════════════════
function PlatformBadge({ name }: { name: string }) {
    return (
        <span style={{
            display: 'inline-block',
            padding: '0.15rem 0.45rem',
            borderRadius: '0.3rem',
            fontSize: '0.65rem',
            fontWeight: 700,
            background: 'rgba(59, 130, 246, 0.1)',
            color: '#60a5fa',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            letterSpacing: '0.03em',
        }}>
            {name}
        </span>
    );
}

// ═══════════════════════════════════════════════════════════
//  CANDIDATE DETAIL MODAL (FORM-BASED)
// ═══════════════════════════════════════════════════════════
function CandidateModal({ candidate, onClose, onSave, onDelete }: { candidate: Candidate; onClose: () => void; onSave: (c: Candidate) => void; onDelete: (id: number) => void }) {
    const [form, setForm] = useState<Candidate>({ ...candidate });

    const updateField = (key: keyof Candidate, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="admin-modal"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="admin-modal-header">
                    <h2>Edit Candidate</h2>
                    <button className="admin-modal-close" onClick={onClose}>{Icons.close}</button>
                </div>
                <div className="admin-modal-body">
                    <div className="candidate-detail-section">
                        <h3>Basic Information</h3>
                        <div className="form-grid">
                            <FormField label="Name" value={form.name} onChange={(v) => updateField('name', v)} />
                            <FormField label="Email" value={form.email} onChange={(v) => updateField('email', v)} />
                            <FormField label="Phone" value={form.phone} onChange={(v) => updateField('phone', v)} />
                            <FormField label="Title" value={form.title} onChange={(v) => updateField('title', v)} />
                            <FormField label="Location" value={form.preferred_location} onChange={(v) => updateField('preferred_location', v)} />
                            <FormField label="Work Authorization" value={form.work_authorization} onChange={(v) => updateField('work_authorization', v)} />
                        </div>
                    </div>

                    <div className="candidate-detail-section">
                        <h3>Skills &amp; Preferences</h3>
                        <div className="form-grid">
                            <FormField label="Key Skills" value={form.key_skills} onChange={(v) => updateField('key_skills', v)} />
                            <FormField label="Employment Type" value={form.employment_type} onChange={(v) => updateField('employment_type', v)} />
                            <FormField label="Salary" value={form.salary_expectations} onChange={(v) => updateField('salary_expectations', v)} />
                            <FormField label="Experience" value={form.experience_years} onChange={(v) => updateField('experience_years', v)} />
                            <FormField label="Education" value={form.education} onChange={(v) => updateField('education', v)} />
                            <FormField label="Search Status" value={form.search_status} onChange={(v) => updateField('search_status', v)} />
                        </div>
                    </div>

                    <div className="candidate-detail-section">
                        <h3>Platform Status</h3>
                        <div className="candidate-detail-grid">
                            <Field label="Dice" value={form.dice_active ? '✅ Active' : '❌ Inactive'} />
                            <Field label="YCombinator" value={form.yc_active ? '✅ Active' : '❌ Inactive'} />
                            <Field label="Job Jarvis" value={form.job_jarvis_active ? '✅ Active' : '❌ Inactive'} />
                        </div>
                    </div>

                    <div className="modal-actions" style={{ justifyContent: 'space-between' }}>
                        <button className="btn-admin-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={() => onDelete(form.id)}>
                            {Icons.trash} Delete Candidate
                        </button>
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                            <button className="btn-admin-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn-admin-primary" onClick={() => onSave(form)}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
//  ENTERPRISE EDIT MODAL (FORM-BASED)
// ═══════════════════════════════════════════════════════════
function EnterpriseModal({ enterprise, onClose, onSave, onDelete }: { enterprise: Enterprise; onClose: () => void; onSave: (e: Enterprise) => void; onDelete: (id: number) => void }) {
    const [form, setForm] = useState<Enterprise>({ ...enterprise });

    const updateField = (key: keyof Enterprise, value: string | number) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="admin-modal"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="admin-modal-header">
                    <h2>Edit Enterprise — {form.company}</h2>
                    <button className="admin-modal-close" onClick={onClose}>{Icons.close}</button>
                </div>
                <div className="admin-modal-body">
                    <div className="candidate-detail-section">
                        <h3>Contact Details</h3>
                        <div className="form-grid">
                            <FormField label="Name" value={form.name} onChange={(v) => updateField('name', v)} />
                            <FormField label="Email" value={form.email} onChange={(v) => updateField('email', v)} />
                        </div>
                    </div>

                    <div className="candidate-detail-section">
                        <h3>Company Details</h3>
                        <div className="form-grid">
                            <FormField label="Company" value={form.company} onChange={(v) => updateField('company', v)} />
                            <FormField label="Location" value={form.location} onChange={(v) => updateField('location', v)} />
                            <FormField label="Status" value={form.status} onChange={(v) => updateField('status', v)} />
                            <Field label="Joined" value={form.joined} />
                        </div>
                    </div>

                    <div className="candidate-detail-section">
                        <h3>Statistics</h3>
                        <div className="candidate-detail-grid">
                            <Field label="Recruiters" value={String(form.recruiters)} />
                            <Field label="Candidates" value={String(form.candidates)} />
                            <Field label="Jobs Posted" value={String(form.jobs_posted)} />
                        </div>
                    </div>

                    <div className="modal-actions" style={{ justifyContent: 'space-between' }}>
                        <button className="btn-admin-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} onClick={() => onDelete(form.id)}>
                            {Icons.trash} Delete Enterprise
                        </button>
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                            <button className="btn-admin-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn-admin-primary" onClick={() => onSave(form)}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
//  DELETE CONFIRMATION MODAL
// ═══════════════════════════════════════════════════════════
function DeleteConfirmModal({ type, onConfirm, onCancel }: { type: 'candidate' | 'enterprise'; onConfirm: () => void; onCancel: () => void }) {
    return (
        <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
        >
            <motion.div
                className="admin-modal"
                style={{ maxWidth: '420px' }}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="admin-modal-header">
                    <h2>Confirm Delete</h2>
                    <button className="admin-modal-close" onClick={onCancel}>{Icons.close}</button>
                </div>
                <div className="admin-modal-body">
                    <div className="delete-confirm-wrapper">
                        <p>Are you sure you want to delete this <strong>{type}</strong>?</p>
                        <p className="warn">This action cannot be undone.</p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                            <button className="btn-admin-secondary" onClick={onCancel}>Cancel</button>
                            <button className="btn-admin-danger" style={{ padding: '0.55rem 1.2rem' }} onClick={onConfirm}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
//  COMMENT MODAL
// ═══════════════════════════════════════════════════════════
function CommentModal({ job, comment, onChange, onSave, onClose }: {
    job: Job; comment: string; onChange: (v: string) => void; onSave: () => void; onClose: () => void;
}) {
    return (
        <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="admin-modal"
                style={{ maxWidth: '480px' }}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="admin-modal-header">
                    <h2>Edit Comment — #{job.id}</h2>
                    <button className="admin-modal-close" onClick={onClose}>{Icons.close}</button>
                </div>
                <div className="admin-modal-body">
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
                        <strong style={{ color: '#f1f5f9' }}>{job.title}</strong> at {job.company}
                    </p>
                    <textarea
                        className="comment-textarea"
                        value={comment}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Add a reason or comment..."
                    />
                    <div className="modal-actions">
                        <button className="btn-admin-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn-admin-primary" onClick={onSave}>Save Comment</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
//  FORM FIELD (always-visible input)
// ═══════════════════════════════════════════════════════════
function FormField({ label, value, onChange, placeholder, type = 'text' }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
    return (
        <div className="form-field">
            <label className="form-field-label">{label}</label>
            <input
                className="form-field-input"
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            />
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
//  FORM SELECT (dropdown field)
// ═══════════════════════════════════════════════════════════
function FormSelect({ label, value, onChange, options }: {
    label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
    return (
        <div className="form-field">
            <label className="form-field-label">{label}</label>
            <select
                className="form-field-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
//  CREATE JOB MODAL
// ═══════════════════════════════════════════════════════════
function CreateJobModal({ onClose, onCreate }: { onClose: () => void; onCreate: (job: Omit<Job, 'id' | 'created_at' | 'candidate_status' | 'resume_available'>) => void }) {
    const [form, setForm] = useState({
        candidate_name: '',
        candidate_id: 0,
        title: '',
        company: '',
        link: '',
        source: 'Manual',
        status: 'queued',
        comment: '',
    });

    const handleSubmit = () => {
        if (!form.title.trim() || !form.company.trim()) return;
        onCreate(form);
    };

    return (
        <motion.div
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="admin-modal"
                style={{ maxWidth: '560px' }}
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="admin-modal-header">
                    <h2>Create New Job</h2>
                    <button className="admin-modal-close" onClick={onClose}>{Icons.close}</button>
                </div>
                <div className="admin-modal-body">
                    <div className="form-grid">
                        <FormField
                            label="Candidate ID"
                            value={form.candidate_id ? String(form.candidate_id) : ''}
                            onChange={(v) => setForm((p) => ({ ...p, candidate_id: parseInt(v) || 0 }))}
                            placeholder="Enter Candidate ID"
                        />
                        <FormField
                            label="Job Title"
                            value={form.title}
                            onChange={(v) => setForm((p) => ({ ...p, title: v }))}
                            placeholder="e.g. Software Engineer"
                        />
                        <FormField
                            label="Company"
                            value={form.company}
                            onChange={(v) => setForm((p) => ({ ...p, company: v }))}
                            placeholder="e.g. Google"
                        />
                        <FormField
                            label="Job Link"
                            value={form.link}
                            onChange={(v) => setForm((p) => ({ ...p, link: v }))}
                            placeholder="https://..."
                        />
                        <FormSelect
                            label="Source"
                            value={form.source}
                            onChange={(v) => setForm((p) => ({ ...p, source: v }))}
                            options={['Manual', ...SOURCES]}
                        />
                        <FormSelect
                            label="Status"
                            value={form.status}
                            onChange={(v) => setForm((p) => ({ ...p, status: v }))}
                            options={STATUSES}
                        />
                    </div>
                    <div className="form-field" style={{ marginTop: '1rem' }}>
                        <label className="form-field-label">Comment (Optional)</label>
                        <textarea
                            className="comment-textarea"
                            value={form.comment}
                            onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                            placeholder="Any notes..."
                            rows={3}
                        />
                    </div>
                    <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
                        <button className="btn-admin-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn-admin-primary" onClick={handleSubmit}>Create</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
//  FIELD HELPER (read-only)
// ═══════════════════════════════════════════════════════════
function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="candidate-detail-field">
            <span className="field-label">{label}</span>
            <span className={`field-value ${!value ? 'empty' : ''}`}>{value || 'Not provided'}</span>
        </div>
    );
}
