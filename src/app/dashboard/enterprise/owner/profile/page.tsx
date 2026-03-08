'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEnterpriseRole } from '@/lib/enterprise-store';

export default function EnterpriseProfilePage() {
    const [role, setRole] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company_name: '',
        company_location: '',
    });

    useEffect(() => {
        setRole(getEnterpriseRole());
        // Attempt to fetch profile from backend
        (async () => {
            try {
                const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4321';
                const res = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    setFormData(prev => ({
                        ...prev,
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        company_name: data.company_name || '',
                        company_location: data.company_location || '',
                    }));
                }
            } catch { /* API not ready */ }
        })();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setSaved(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4321';
            await fetch(`${API_BASE}/auth/update-profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            setSaved(true);
        } catch { /* API not ready */ }
        setIsSaving(false);
    };

    const accentColor = role === 'recruiter' ? 'violet' : 'blue';
    const inputClass = "w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors";

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-white">
                    My Profile
                </motion.h1>
                <p className="text-slate-400 mt-1">Update your personal information and company details.</p>
            </div>

            <motion.form
                onSubmit={handleSave}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60 space-y-5"
            >
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className={`w-1 h-5 ${accentColor === 'blue' ? 'bg-blue-500' : 'bg-violet-500'} rounded-full`} />
                    Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">First Name</label>
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className={inputClass} placeholder="John" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Last Name</label>
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className={inputClass} placeholder="Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@company.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
                    </div>
                </div>

                <h2 className="text-lg font-semibold text-white flex items-center gap-2 pt-2">
                    <span className={`w-1 h-5 ${accentColor === 'blue' ? 'bg-cyan-500' : 'bg-purple-500'} rounded-full`} />
                    Company Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Company Name</label>
                        <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} className={inputClass} placeholder="Acme Inc." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Company Location</label>
                        <input type="text" name="company_location" value={formData.company_location} onChange={handleChange} className={inputClass} placeholder="San Francisco, CA" />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    {saved && (
                        <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-emerald-400 text-sm flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Saved!
                        </motion.span>
                    )}
                    <motion.button
                        type="submit"
                        disabled={isSaving}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`px-6 py-2.5 ${accentColor === 'blue' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20' : 'bg-violet-600 hover:bg-violet-500 shadow-violet-500/20'} text-white rounded-xl font-medium transition-colors shadow-lg text-sm disabled:opacity-70`}
                    >
                        {isSaving ? (
                            <div className="w-4 h-4 mx-auto border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Save Changes'
                        )}
                    </motion.button>
                </div>
            </motion.form>
        </div>
    );
}
