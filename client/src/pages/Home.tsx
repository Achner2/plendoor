import { useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import RevolutionSection from '@/components/landing/RevolutionSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import DemoSection from '@/components/landing/DemoSection';
import UseCasesSection from '@/components/landing/UseCasesSection';
import EarlyAccessSection from '@/components/landing/EarlyAccessSection';
import Footer from '@/components/landing/Footer';

const Home = () => {
  useEffect(() => {
    document.title = 'Plendoor';
    
    // Create or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Plendoor is revolutionizing architectural planning with AI-powered technology that turns any space into detailed, professional floor plans in minutes.');
    
    // Set other meta tags
    const metaTags = [
      { name: 'keywords', content: 'floor plans, architectural blueprints, AI, design, home planning, interior design' },
      { name: 'author', content: 'Plendoor' },
      { property: 'og:title', content: 'Plendoor - Revolutionary Architectural Blueprint Generation' },
      { property: 'og:description', content: 'Transform any space into professional blueprints with Plendoor\'s AI-powered technology.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Plendoor - Revolutionary Architectural Blueprint Generation' },
      { name: 'twitter:description', content: 'Transform any space into professional blueprints with Plendoor\'s AI-powered technology.' },
    ];
    
    metaTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(tag.property ? 'property' : 'name', (tag.property || tag.name)!);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Add scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Cleanup if needed
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <RevolutionSection />
      <FeaturesSection />
      <DemoSection />
      <UseCasesSection />
      <EarlyAccessSection />
      <Footer />
    </div>
  );
};

export default Home;
