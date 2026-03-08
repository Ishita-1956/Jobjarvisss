'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { getCandidateById, updateCandidateProfile, type Candidate } from '@/lib/enterprise-api';

export default function RecruiterCandidateDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const candidateId = Number(params.id);

    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    // Edit form state
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        title: '',
        keySkills: '',
        experience: '',
        salaryExpectation: '',
        location: '',
        shortPhrase: '',
    });

    useEffect(() => {
        async function load() {
            const data = await getCandidateById(candidateId);
            setCandidate(data);
            if (data) {
                setEditForm({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    title: data.title,
                    keySkills: data.keySkills,
                    experience: data.experience,
                    salaryExpectation: data.salaryExpectation,
                    location: data.location || '',
                    shortPhrase: data.shortPhrase,
                });
            }
            setIsLoading(false);
        }
        load();
    }, [candidateId]);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMessage('');
        const result = await updateCandidateProfile(candidateId, editForm);
        setSaveMessage(result.message);
        setIsSaving(false);
        if (result.success) {
            setIsEditing(false);
            // Refresh data
            const updated = await getCandidateById(candidateId);
            if (updated) setCandidate(updated);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Offer Sent': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'Interviewing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Hired': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'Reviewing': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            default: return 'bg-slate-700/50 text-slate-300 border-slate-600/50';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!candidate) {
        return (
            <div className="text-center py-20">
                <div className="w-20 h-20 rounded-2xl bg-slate-800/60 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Candidate Not Found</h2>
                <p className="text-slate-500 mb-4">This candidate profile could not be loaded.</p>
                <Link href="/dashboard/enterprise/recruiter/candidates" className="text-violet-400 hover:text-violet-300">
                    &larr; Back to Candidates
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/enterprise/recruiter/candidates"
                        className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Candidate Profile</h1>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isEditing
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                            : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/20'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEditing ? "M6 18L18 6M6 6l12 12" : "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"} />
                    </svg>
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
            </motion.div>

            {/* Save Message */}
            {saveMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg text-sm font-medium ${saveMessage.includes('error') || saveMessage.includes('failed')
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                >
                    {saveMessage}
                </motion.div>
            )}

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-violet-500/20">
                        {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>

                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm outline-none focus:border-violet-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={editForm.title}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm outline-none focus:border-violet-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm outline-none focus:border-violet-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm outline-none focus:border-violet-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Experience</label>
                                        <input
                                            type="text"
                                            value={editForm.experience}
                                            onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm outline-none focus:border-violet-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Salary Expectation</label>
                                        <input
                                            type="text"
                                            value={editForm.salaryExpectation}
                                            onChange={(e) => setEditForm({ ...editForm, salaryExpectation: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm outline-none focus:border-violet-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-500 mb-1">Location</label>
                                        <input
                                            type="text"
                                            value={editForm.location}
                                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm outline-none focus:border-violet-500/50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Key Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        value={editForm.keySkills}
                                        onChange={(e) => setEditForm({ ...editForm, keySkills: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm outline-none focus:border-violet-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">Short Description</label>
                                    <textarea
                                        value={editForm.shortPhrase}
                                        onChange={(e) => setEditForm({ ...editForm, shortPhrase: e.target.value })}
                                        rows={2}
                                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm outline-none focus:border-violet-500/50 resize-none"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-violet-500/20 disabled:opacity-50"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-1">{candidate.name}</h2>
                                        <p className="text-lg text-violet-400 font-medium">{candidate.title || 'Candidate'}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border self-start ${getStatusColor(candidate.status)}`}>
                                        {candidate.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {candidate.email}
                                    </div>
                                    {candidate.phone && (
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {candidate.phone}
                                        </div>
                                    )}
                                    {candidate.location && (
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {candidate.location}
                                        </div>
                                    )}
                                </div>

                                {candidate.shortPhrase && (
                                    <div className="mt-6 p-4 bg-violet-500/5 border border-violet-500/10 rounded-xl">
                                        <p className="text-violet-200 italic">&quot;{candidate.shortPhrase}&quot;</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Details Grid */}
            {!isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 space-y-8"
                    >
                        {/* Skills */}
                        <section>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-violet-500 rounded-full" />
                                Key Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.keySkills ? (
                                    candidate.keySkills.split(',').map((skill, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700">
                                            {skill.trim()}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-slate-500 italic text-sm">No skills listed.</p>
                                )}
                            </div>
                        </section>

                        {/* Proud Project */}
                        {candidate.proudProject && (
                            <section className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-3">Proudest Project</h3>
                                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{candidate.proudProject}</p>
                            </section>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Info Card */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Details</h3>

                            {[
                                { label: 'Experience', value: candidate.experience || '—' },
                                { label: 'Salary Expectation', value: candidate.salaryExpectation || '—' },
                                { label: 'Min Salary', value: candidate.minSalary || '—' },
                                { label: 'Willing to Relocate', value: candidate.willingToRelocate ? 'Yes' : 'No' },
                                { label: 'Job Function', value: candidate.jobFunction || '—' },
                                { label: 'Applied', value: candidate.appliedDate || '—' },
                            ].map((item) => (
                                <div key={item.label}>
                                    <span className="block text-xs text-slate-500 mb-1">{item.label}</span>
                                    <span className="text-white font-medium text-sm">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Resume Download */}
                        {candidate.resumePath && (
                            <a
                                href={`/api/resume/${candidate.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-violet-600/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Resume
                            </a>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
