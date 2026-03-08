'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function OwnerSettingsPage() {
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [companyLocation, setCompanyLocation] = useState('');
    const [companySize, setCompanySize] = useState('');

    const handleSave = () => {
        // API integration will be added later
        console.log('Settings save — API not connected yet');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white"
                >
                    Company Settings
                </motion.h1>
                <p className="text-slate-400 mt-1">Manage your company profile and configuration.</p>
            </div>

            {/* Company Profile Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60"
            >
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-5 bg-blue-500 rounded-full" />
                    Company Profile
                </h2>

                <div className="space-y-5">
                    {/* Logo Upload */}
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors group">
                            <svg className="w-8 h-8 text-slate-600 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">Company Logo</p>
                            <p className="text-slate-500 text-xs mt-1">Upload a logo (PNG, JPG up to 2MB)</p>
                            <button className="mt-2 px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors">
                                Upload Image
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Company Name</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Enter company name"
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Contact Email</label>
                            <input
                                type="email"
                                value={companyEmail}
                                onChange={(e) => setCompanyEmail(e.target.value)}
                                placeholder="hr@company.com"
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Website</label>
                            <input
                                type="url"
                                value={companyWebsite}
                                onChange={(e) => setCompanyWebsite(e.target.value)}
                                placeholder="https://company.com"
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Location</label>
                            <input
                                type="text"
                                value={companyLocation}
                                onChange={(e) => setCompanyLocation(e.target.value)}
                                placeholder="City, Country"
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1.5">Company Size</label>
                            <select
                                value={companySize}
                                onChange={(e) => setCompanySize(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm outline-none focus:border-blue-500/50 transition-colors"
                            >
                                <option value="">Select size</option>
                                <option value="1-10">1-10 employees</option>
                                <option value="11-50">11-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201-500">201-500 employees</option>
                                <option value="500+">500+ employees</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">About Company</label>
                        <textarea
                            value={companyDescription}
                            onChange={(e) => setCompanyDescription(e.target.value)}
                            placeholder="Brief description of your company..."
                            rows={4}
                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-600 outline-none focus:border-blue-500/50 transition-colors resize-none"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Plan & Subscription */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60"
            >
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-5 bg-violet-500 rounded-full" />
                    Plan & Subscription
                </h2>

                <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <div>
                        <p className="text-white font-medium">Current Plan</p>
                        <p className="text-slate-500 text-sm mt-1">Plan information will appear once connected to backend</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-700/50 text-slate-400 rounded-full text-xs font-medium border border-slate-600">
                        Not Connected
                    </span>
                </div>
            </motion.div>



            {/* Save Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end gap-3"
            >
                <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors border border-slate-700">
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20"
                >
                    Save Changes
                </button>
            </motion.div>
        </div>
    );
}
