import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-1 bg-primary/20 hover:bg-primary/30 px-3 py-1.5 rounded-full text-sm transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLanguage.name}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-background/95 backdrop-blur-md border border-foreground/10 rounded-lg shadow-lg z-50">
          <ul className="py-1">
            {languages.map(lang => (
              <li key={lang.code}>
                <button
                  className={`block w-full text-left px-4 py-2 text-sm ${currentLanguage.code === lang.code ? 'bg-primary/20 text-accent' : 'hover:bg-primary/10'}`}
                  onClick={() => changeLanguage(lang.code)}
                >
                  {t(`languageSwitcher.${lang.code}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
