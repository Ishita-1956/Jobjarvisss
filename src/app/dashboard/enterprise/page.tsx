'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getEnterpriseRole } from '@/lib/enterprise-store';

export default function EnterpriseDashboardRedirect() {
    const router = useRouter();

    useEffect(() => {
        const role = getEnterpriseRole();
        if (role) {
            router.replace(`/dashboard/enterprise/${role}`);
        } else {
            // No role stored — default to owner dashboard
            router.replace('/dashboard/enterprise/owner');
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-14 h-14 rounded-full border-4 border-slate-800" />
                    <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
                </div>
                <p className="text-slate-500 text-sm">Redirecting to your dashboard...</p>
            </div>
        </div>
    );
}
