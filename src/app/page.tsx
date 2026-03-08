import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorks from '@/components/sections/HowItWorks';
import Features from '@/components/sections/Features';
import WhyJarvis from '@/components/sections/WhyJarvis';
import VideoDemo from '@/components/sections/VideoDemo';
import WhereYouStand from '@/components/sections/WhereYouStand';
import About from '@/components/sections/About';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <WhyJarvis />
        <WhereYouStand />
        <VideoDemo />
        <About />
      </main>
      <Footer />
    </>
  );
}
