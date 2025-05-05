import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-background relative">
      <div className="blueprint-bg absolute inset-0 opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="text-accent font-title text-3xl font-bold mb-4">Plendoor</div>
            <p className="text-foreground/70 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-foreground hover:bg-primary/40 transition-colors"
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-foreground hover:bg-primary/40 transition-colors"
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-foreground hover:bg-primary/40 transition-colors"
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-foreground hover:bg-primary/40 transition-colors"
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2 text-foreground/70">
              <li><a href="#features" className="hover:text-accent transition-colors">{t('navbar.features')}</a></li>
              <li><a href="#demo" className="hover:text-accent transition-colors">{t('navbar.demo')}</a></li>
              <li><a href="#use-cases" className="hover:text-accent transition-colors">{t('navbar.useCases')}</a></li>
              <li><a href="#early-access" className="hover:text-accent transition-colors">{t('navbar.earlyAccess')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-foreground/70">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:info@plendoor.com" className="hover:text-accent transition-colors">info@plendoor.com</a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Colombia</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" clipRule="evenodd" />
                </svg>
                <a href="#" className="hover:text-accent transition-colors">{t('footer.supportCenter')}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            &copy; {currentYear} {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-foreground/60">
            <a href="#" className="hover:text-accent transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-accent transition-colors">{t('footer.termsOfService')}</a>
            <a href="#" className="hover:text-accent transition-colors">{t('footer.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
