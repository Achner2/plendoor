import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 p-4 ${
        scrolled ? 'navbar-fixed' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-accent font-title text-3xl font-bold relative">
            <span>Plendoor</span>
            <svg className="absolute -bottom-2 -left-1 w-full h-2 blueprint-line animate-draw-line" viewBox="0 0 100 10">
              <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-foreground hover:text-accent transition-colors">{t('navbar.features')}</a>
          <a href="#demo" className="text-foreground hover:text-accent transition-colors">{t('navbar.demo')}</a>
          <a href="#use-cases" className="text-foreground hover:text-accent transition-colors">{t('navbar.useCases')}</a>
          <a href="#early-access" className="text-foreground hover:text-accent transition-colors">{t('navbar.earlyAccess')}</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <button 
            className="bg-gradient-primary px-6 py-2 rounded-full text-foreground font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            {t('common.signUp')}
          </button>
          <button 
            className="md:hidden ml-4 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background/95 backdrop-blur-md mt-4 p-4 rounded-lg shadow-lg"
        >
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.features')}
            </a>
            <a 
              href="#demo" 
              className="text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.demo')}
            </a>
            <a 
              href="#use-cases" 
              className="text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.useCases')}
            </a>
            <a 
              href="#early-access" 
              className="text-foreground hover:text-accent transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.earlyAccess')}
            </a>
            <div className="pt-2 flex space-x-3">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
