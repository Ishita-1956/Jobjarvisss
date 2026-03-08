'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddCandidatePage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        skills: '',
        location: '',
        resume_url: '',
        notes: '',
        status: 'new',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4321';
            await fetch(`${API_BASE}/enterprise/recruiter/candidates`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
        } catch {
            // API not ready yet — just log
        }
        setIsSaving(false);
        router.push('/dashboard/enterprise/recruiter/candidates');
    };

    const inputClass = "w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:border-violet-500/50 transition-colors";

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-white">
                        Add New Candidate
                    </motion.h1>
                    <p className="text-slate-400 mt-1">Add a candidate to your pipeline and track their progress.</p>
                </div>
                <Link href="/dashboard/enterprise/recruiter/candidates" className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-xl hover:border-slate-600 transition-colors">
                    ← Back
                </Link>
            </div>

            {/* Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60 space-y-5"
            >
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-1 h-5 bg-violet-500 rounded-full" />
                    Candidate Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">First Name *</label>
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className={inputClass} placeholder="John" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Last Name *</label>
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className={inputClass} placeholder="Doe" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Position / Role</label>
                        <input type="text" name="position" value={formData.position} onChange={handleChange} className={inputClass} placeholder="Frontend Developer" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Experience (years)</label>
                        <input type="text" name="experience" value={formData.experience} onChange={handleChange} className={inputClass} placeholder="3" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="San Francisco, CA" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                            <option value="new">New</option>
                            <option value="screening">Screening</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="hired">Hired</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">Skills (comma-separated)</label>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} className={inputClass} placeholder="React, TypeScript, Node.js" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">Resume URL</label>
                    <input type="url" name="resume_url" value={formData.resume_url} onChange={handleChange} className={inputClass} placeholder="https://drive.google.com/..." />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1.5">Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Any additional notes about this candidate..." />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Link href="/dashboard/enterprise/recruiter/candidates" className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors border border-slate-700 text-sm">
                        Cancel
                    </Link>
                    <motion.button
                        type="submit"
                        disabled={isSaving}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-violet-500/20 text-sm disabled:opacity-70"
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 mx-auto border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Add Candidate'
                        )}
                    </motion.button>
                </div>
            </motion.form>
        </div>
    );
}
