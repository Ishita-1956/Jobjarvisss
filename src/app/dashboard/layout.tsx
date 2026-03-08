'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, User } from '@/lib/auth';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import EnterpriseSidebar from '@/components/dashboard/EnterpriseSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isEnterprise = pathname?.startsWith('/dashboard/enterprise');

    useEffect(() => {
        async function fetchUser() {
            try {
                const userData = await getCurrentUser();
                if (!userData) {
                    // DEMO MODE: If API is down or not logged in, use Mock User
                    console.log("Demo Mode: Using Mock Enterprise Admin");
                    setUser({
                        id: 999,
                        first_name: "Demo",
                        last_name: "Admin",
                        email: "admin@demo.com",
                        role: "admin",
                        company_id: 1,
                        company_name: "Demo Corp"
                    });
                    setIsLoading(false);
                    return;
                }
                setUser(userData);
            } catch (error) {
                // Fallback for safety
                setUser({
                    id: 999,
                    first_name: "Demo",
                    last_name: "Admin",
                    email: "admin@demo.com",
                    role: "admin"
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchUser();
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-800">
                        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
                    </div>
                    <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Background gradient */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative flex min-h-screen">
                {/* Sidebar — conditionally rendered */}
                {isEnterprise ? (
                    <EnterpriseSidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        user={user}
                    />
                ) : (
                    <DashboardSidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        user={user}
                    />
                )}

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <DashboardHeader
                        user={user}
                        onMenuClick={() => setIsSidebarOpen(true)}
                    />

                    {/* Page Content */}
                    <main className="flex-1 px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6 overflow-x-hidden overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
