import Navbar from '@/components/Navbar';
import EnterpriseHero from '@/components/sections/EnterpriseHero';
import EnterpriseFeatures from '@/components/sections/EnterpriseFeatures';
import EnterpriseHowItWorks from '@/components/sections/EnterpriseHowItWorks';
import EnterpriseCTA from '@/components/sections/EnterpriseCTA';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Job Jarvis for Enterprise | Recruit Smarter at Scale',
    description: 'AI-powered recruiting for enterprise teams and staffing agencies. Source, screen, and hire top talent faster.',
};

export default function EnterprisePage() {
    return (
        <>
            <Navbar />
            <main>
                <EnterpriseHero />
                <EnterpriseFeatures />
                <EnterpriseHowItWorks />
                <EnterpriseCTA />
            </main>
            <Footer />
        </>
    );
}
