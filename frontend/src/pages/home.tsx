import { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { CallToAction } from '../components/home/CallToAction';
import { AboutSection } from '../components/home/AboutSection';

export default function HomePage() {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Call to Action Section */}
      <CallToAction />
      
      {/* About Section */}
      <AboutSection />
    </div>
  );
}
