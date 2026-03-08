'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface CandidateProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    title: string;
    key_skills: string;
    resume_path: string;
    profile_image: string;
    // Generic Questions
    gq_relocate: string;
    gq_job_function: string;
    gq_eng_roles: string;
    gq_experience_years: string;
    gq_salary_expectations: string;
    gq_min_salary: string;
    gq_short_phrase: string;
    gq_proud_project: string;
}

export default function CandidateDetailPage() {
    const params = useParams();
    const candidateId = params.id;

    const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!candidateId) return;

            try {
                // API: /api/candidate/<candidate_id>
                const response = await fetch(`/api/candidate/${candidateId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCandidate(data);
                } else {
                    throw new Error("API Failed");
                }
            } catch (error) {
                console.log("Using Mock Data");
                setCandidate({
                    id: Number(candidateId),
                    name: "John Doe",
                    email: "john.d@example.com",
                    phone: "+1 (555) 123-4567",
                    title: "Senior Full Stack Engineer",
                    key_skills: "React, Node.js, Python, AWS, Docker, TypeScript, PostgreSQL",
                    resume_path: "/mock/resume.pdf",
                    profile_image: "",
                    gq_relocate: "Yes",
                    gq_job_function: "Software Engineering",
                    gq_eng_roles: "Backend, Full Stack",
                    gq_experience_years: "5",
                    gq_salary_expectations: "$140k - $160k",
                    gq_min_salary: "$130k",
                    gq_short_phrase: "Passionate about building scalable systems.",
                    gq_proud_project: "Led the migration of a monolithic architecture to microservices, improving system reliability by 99.9%."
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [candidateId]);

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
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
                <h2 className="text-2xl font-bold text-white mb-2">Candidate Not Found</h2>
                <button onClick={() => window.history.back()} className="text-violet-400 hover:text-violet-300">
                    &larr; Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header / Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 relative overflow-hidden"
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden shadow-xl">
                        {candidate.profile_image ? (
                            <img src={candidate.profile_image} alt={candidate.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl">👤</span>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">{candidate.name}</h1>
                                <p className="text-lg text-violet-400 font-medium">{candidate.title || 'Candidate'}</p>
                            </div>
                            <div className="flex gap-3">
                                {candidate.resume_path && (
                                    <a
                                        href={`/api/resume/${candidate.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Resume
                                    </a>
                                )}
                            </div>
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
                        </div>

                        {candidate.gq_short_phrase && (
                            <div className="mt-6 p-4 bg-violet-500/5 border border-violet-500/10 rounded-xl">
                                <p className="text-violet-200 italic">"{candidate.gq_short_phrase}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
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
                            {candidate.key_skills ? (
                                candidate.key_skills.split(',').map((skill, index) => (
                                    <span key={index} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700">
                                        {skill.trim()}
                                    </span>
                                ))
                            ) : (
                                <p className="text-slate-500 italic">No skills listed.</p>
                            )}
                        </div>
                    </section>

                    {/* Proud Project */}
                    {candidate.gq_proud_project && (
                        <section className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-3">Proudest Project</h3>
                            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{candidate.gq_proud_project}</p>
                        </section>
                    )}
                </motion.div>

                {/* Sidebar Column */}
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    {/* Preferences Card */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Preferences</h3>

                        <div>
                            <span className="block text-xs text-slate-500 mb-1">Open to Relocate</span>
                            <span className="text-white font-medium">{candidate.gq_relocate || 'N/A'}</span>
                        </div>

                        <div>
                            <span className="block text-xs text-slate-500 mb-1">Job Function</span>
                            <span className="text-white font-medium">{candidate.gq_job_function || 'N/A'}</span>
                        </div>

                        <div>
                            <span className="block text-xs text-slate-500 mb-1">Min Salary</span>
                            <span className="text-white font-medium">{candidate.gq_min_salary || 'N/A'}</span>
                        </div>

                        <div>
                            <span className="block text-xs text-slate-500 mb-1">Experience</span>
                            <span className="text-white font-medium">{candidate.gq_experience_years || '0'} Years</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
