import Navbar from '@/components/Navbar';
import IndividualHero from '@/components/sections/IndividualHero';
import IndividualFeatures from '@/components/sections/IndividualFeatures';
import IndividualHowItWorks from '@/components/sections/IndividualHowItWorks';
import IndividualVideoDemo from '@/components/sections/IndividualVideoDemo';
import IndividualCTA from '@/components/sections/IndividualCTA';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Job Jarvis for Job Seekers | Automated Job Applications',
    description: 'Let Jarvis apply to hundreds of jobs while you focus on interviews. AI-powered job applications for job seekers.',
};

export default function IndividualsPage() {
    return (
        <>
            <Navbar />
            <main>
                <IndividualHero />
                <IndividualFeatures />
                <IndividualHowItWorks />
                <IndividualVideoDemo />
                <IndividualCTA />
            </main>
            <Footer />
        </>
    );
}
