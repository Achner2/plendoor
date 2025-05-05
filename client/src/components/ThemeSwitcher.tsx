import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';

const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  );

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Initialize with system preference or previously stored setting
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme === 'light' ? 'light' : 'dark');
    } else {
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent/10 transition-colors"
      aria-label={t('common.toggleTheme')}
      title={t('common.toggleTheme')}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-foreground" />
      ) : (
        <Sun className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
