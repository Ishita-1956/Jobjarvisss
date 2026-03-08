import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
    title: "JobJarvis Admin | Dashboard",
    description: "Internal admin dashboard for the Job Jarvis team",
    robots: "noindex, nofollow",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
