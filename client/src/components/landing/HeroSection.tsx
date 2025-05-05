import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): CountdownValues => {
  // Set launch date to 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);
  
  const difference = launchDate.getTime() - new Date().getTime();
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0');
};

// Función para aplicar la animación de tick a un elemento específico
const triggerTickAnimation = (seconds: number, minutes: number, hours: number) => {
  // Siempre animar los segundos
  const secondsElement = document.querySelector('.tick-seconds');
  if (secondsElement) {
    secondsElement.classList.remove('animate-[tick_0.5s_ease-in-out]');
    setTimeout(() => {
      secondsElement.classList.add('animate-[tick_0.5s_ease-in-out]');
    }, 20);
  }
  
  if (seconds === 59 || seconds === 0) {
    // Animar los minutos cuando los segundos cambian a 59 (va a cambiar) o 0 (acaba de cambiar)
    const minutesElement = document.querySelector('.tick-minutes');
    if (minutesElement) {
      minutesElement.classList.remove('animate-[tick_0.5s_ease-in-out]');
      setTimeout(() => {
        minutesElement.classList.add('animate-[tick_0.5s_ease-in-out]');
      }, 20);
    }
    
    // Si también los minutos son 59 o 0, animar las horas
    if (minutes === 59 || minutes === 0) {
      const hoursElement = document.querySelector('.tick-hours');
      if (hoursElement) {
        hoursElement.classList.remove('animate-[tick_0.5s_ease-in-out]');
        setTimeout(() => {
          hoursElement.classList.add('animate-[tick_0.5s_ease-in-out]');
        }, 20);
      }
      
      // Si también las horas son 23 o 0, animar los días
      if (hours === 23 || hours === 0) {
        const daysElement = document.querySelector('.tick-days');
        if (daysElement) {
          daysElement.classList.remove('animate-[tick_0.5s_ease-in-out]');
          setTimeout(() => {
            daysElement.classList.add('animate-[tick_0.5s_ease-in-out]');
          }, 20);
        }
      }
    }
  }
};

const HeroSection = () => {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  const [timeLeft, setTimeLeft] = useState<CountdownValues>(calculateTimeLeft());

  useEffect(() => {
    // Iniciamos la animación para los segundos
    setTimeout(() => {
      const secondsElement = document.querySelector('.tick-seconds');
      if (secondsElement) {
        secondsElement.classList.add('animate-[tick_0.5s_ease-in-out]');
      }
    }, 500);
    
    // Variable para mantener el segundero anterior
    let lastSeconds = timeLeft.seconds;
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      
      // Animación más visible cuando cambia el valor
      if (newTimeLeft.seconds !== lastSeconds) {
        // Llamar a la función para animar los dígitos que cambian
        triggerTickAnimation(newTimeLeft.seconds, newTimeLeft.minutes, newTimeLeft.hours);
        lastSeconds = newTimeLeft.seconds;
      }
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 blueprint-bg overflow-hidden" id="hero">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent opacity-70"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 md:w-44 md:h-44 opacity-20 animate-float">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#8337cf" d="M40,60 L60,60 L60,40 L160,40 L160,160 L40,160 Z" fillOpacity="0.2" stroke="#00e8fc" strokeWidth="1" className="blueprint-line"></path>
          <path fill="none" stroke="#00e8fc" strokeWidth="1" d="M60,40 L60,20 L180,20 L180,140 L160,140 L160,160" className="blueprint-line"></path>
          <circle cx="100" cy="100" r="20" fill="none" stroke="#00e8fc" strokeWidth="1" className="blueprint-line"></circle>
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 right-10 w-32 h-32 md:w-44 md:h-44 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect x="40" y="40" width="120" height="120" fill="#3a7bd5" fillOpacity="0.2" stroke="#00e8fc" strokeWidth="1" className="blueprint-line"></rect>
          <line x1="40" y1="40" x2="160" y2="160" stroke="#00e8fc" strokeWidth="1" className="blueprint-line"></line>
          <line x1="40" y1="160" x2="160" y2="40" stroke="#00e8fc" strokeWidth="1" className="blueprint-line"></line>
        </svg>
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-block px-4 py-2 bg-accent/10 rounded-full">
              <p className="text-accent font-mono text-sm">{t('hero.comingSoon')}</p>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-title font-bold leading-tight">
              <span className="block">{t('hero.title1')}</span>
              <span className="bg-gradient-primary text-transparent bg-clip-text">{t('hero.title2')}</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-foreground/80 max-w-lg">
              {t('hero.description')}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-primary hover:bg-primary/90 rounded-full text-primary-foreground font-medium transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
                {t('common.getEarlyAccess')}
              </button>
              <button className="px-8 py-3 bg-secondary hover:bg-secondary/90 rounded-full text-secondary-foreground font-medium transition-all transform hover:scale-105 shadow-md shadow-secondary/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {t('common.watchDemo')}
              </button>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-8">
              <div className="flex justify-center items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-lg font-title font-bold">{t('hero.launchingIn')}</p>
              </div>
              <div className="flex gap-2 justify-center">
                <div className="neumorph bg-background rounded-lg p-3 w-16 h-18 flex flex-col items-center justify-center">
                  <div className="text-xl font-mono text-primary font-bold text-center tick-days">{formatNumber(timeLeft.days)}</div>
                  <div className="text-[10px] text-foreground/60 text-center mt-1 font-medium">{t('hero.days')}</div>
                </div>
                <div className="flex items-center justify-center text-lg font-bold text-foreground/40 px-0.5">:</div>
                <div className="neumorph bg-background rounded-lg p-3 w-16 h-18 flex flex-col items-center justify-center">
                  <div className="text-xl font-mono text-secondary font-bold text-center tick-hours">{formatNumber(timeLeft.hours)}</div>
                  <div className="text-[10px] text-foreground/60 text-center mt-1 font-medium">{t('hero.hours')}</div>
                </div>
                <div className="flex items-center justify-center text-lg font-bold text-foreground/40 px-0.5">:</div>
                <div className="neumorph bg-background rounded-lg p-3 w-16 h-18 flex flex-col items-center justify-center">
                  <div className="text-xl font-mono text-accent font-bold text-center tick-minutes">{formatNumber(timeLeft.minutes)}</div>
                  <div className="text-[10px] text-foreground/60 text-center mt-1 font-medium">{t('hero.minutes')}</div>
                </div>
                <div className="flex items-center justify-center text-lg font-bold text-foreground/40 px-0.5">:</div>
                <div className="relative neumorph bg-background rounded-lg p-3 w-16 h-18 flex flex-col items-center justify-center overflow-hidden">
                  <div className="text-xl font-mono text-primary font-bold text-center tick-seconds relative z-10">{formatNumber(timeLeft.seconds)}</div>
                  <div className="text-[10px] text-foreground/60 text-center mt-1 font-medium relative z-10">{t('hero.seconds')}</div>
                  <div className="absolute bottom-0 left-0 h-full bg-primary/10 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft.seconds / 60) * 100}%` }}></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10"
          >
            <div className="relative backdrop-blur-sm bg-background/30 rounded-xl border border-accent/30 p-6 neumorph-strong">
              {/* Blueprint grid overlay */}
              <div className="absolute inset-4 overflow-hidden rounded-lg">
                <div className="w-full h-full blueprint-grid opacity-20"></div>
              </div>
              
              {/* Interactive Blueprint Display */}
              <div className="relative z-10 rounded-xl mb-8 mt-6">
                <div className="p-8 bg-background/50 backdrop-blur-md rounded-xl border border-accent/30 shadow-xl">
                  {/* Interactive Floor Plan */}
                  <div className="relative aspect-video w-full">
                    {/* Grid background */}
                    <div className="absolute inset-0 blueprint-grid opacity-20"></div>
                    
                    {/* Floor plan elements */}
                    <svg className="w-full h-full" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
                      {/* Main outer walls */}
                      <rect x="50" y="50" width="900" height="500" fill="none" stroke="currentColor" strokeWidth="8" className="text-accent" />
                      
                      {/* Inner walls */}
                      <line x1="350" y1="50" x2="350" y2="550" stroke="currentColor" strokeWidth="6" className="text-accent" />
                      <line x1="650" y1="50" x2="650" y2="550" stroke="currentColor" strokeWidth="6" className="text-accent" />
                      <line x1="350" y1="300" x2="650" y2="300" stroke="currentColor" strokeWidth="6" className="text-accent" />
                      
                      {/* Left room - Kitchen */}
                      <g className="text-primary">
                        <text x="200" y="160" fontFamily="monospace" fill="currentColor" fontSize="36" textAnchor="middle" className="font-mono font-bold">{t('hero.kitchen')}</text>
                        
                        {/* Kitchen fixtures */}
                        <rect x="70" y="80" width="100" height="60" fill="none" stroke="currentColor" strokeWidth="3" />
                        <rect x="70" y="400" width="260" height="80" fill="none" stroke="currentColor" strokeWidth="3" />
                        <circle cx="200" cy="230" r="50" fill="none" stroke="currentColor" strokeWidth="3" />
                      </g>
                      
                      {/* Middle room - Living */}
                      <g className="text-secondary">
                        <text x="500" y="160" fontFamily="monospace" fill="currentColor" fontSize="36" textAnchor="middle" className="font-mono font-bold">{t('hero.livingRoom')}</text>
                        
                        {/* Living room fixtures */}
                        <rect x="380" y="360" width="240" height="120" fill="none" stroke="currentColor" strokeWidth="3" />
                        <rect x="470" y="200" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="3" />
                      </g>
                      
                      {/* Right room - Bedroom */}
                      <g className="text-accent">
                        <text x="800" y="160" fontFamily="monospace" fill="currentColor" fontSize="36" textAnchor="middle" className="font-mono font-bold">{t('hero.bedroom')}</text>
                        
                        {/* Bedroom fixtures */}
                        <rect x="680" y="360" width="240" height="120" fill="none" stroke="currentColor" strokeWidth="3" />
                        <rect x="750" y="200" width="100" height="60" fill="none" stroke="currentColor" strokeWidth="3" />
                      </g>
                      
                      {/* Dimensions */}
                      <g className="text-foreground/70 font-mono text-xs">
                        <text x="200" y="570" textAnchor="middle">6.5 m</text>
                        <text x="500" y="570" textAnchor="middle">6.8 m</text>
                        <text x="800" y="570" textAnchor="middle">6.5 m</text>
                      </g>
                      
                      {/* Animation effects */}
                      <circle cx="500" cy="300" r="10" fill="currentColor" className="text-primary animate-ping opacity-75">
                        <animate attributeName="r" values="5;25;5" dur="3s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                    
                    {/* Measurement dots */}
                    <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-accent rounded-full animate-ping"></div>
                    <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-secondary rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                  </div>
                  
                  {/* Measurement label */}
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center justify-center px-3 py-1 bg-accent/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-accent" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
                      </svg>
                      <span className="text-foreground text-sm font-medium">{t('hero.totalArea')}: 120m²</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature icons with labels */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-foreground text-sm font-medium text-center">{t('hero.preciseMeasurements')}</p>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <p className="text-foreground text-sm font-medium text-center">{t('hero.smartDesign')}</p>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-foreground text-sm font-medium text-center">{t('hero.instantGeneration')}</p>
                </div>
              </div>
              
              {/* Animated blueprint corner decorations */}
              <svg className="absolute top-0 left-0 w-8 h-8 text-accent/60" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1V12" stroke="currentColor" strokeWidth="2" className="blueprint-line" />
                <path d="M1 1H12" stroke="currentColor" strokeWidth="2" className="blueprint-line" />
              </svg>
              
              <svg className="absolute top-0 right-0 w-8 h-8 text-accent/60" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31 1V12" stroke="currentColor" strokeWidth="2" className="blueprint-line" />
                <path d="M31 1H20" stroke="currentColor" strokeWidth="2" className="blueprint-line" />
              </svg>
              
              <svg className="absolute bottom-0 left-0 w-8 h-8 text-accent/60" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 31V20" stroke="currentColor" strokeWidth="2" className="blueprint-line" />
                <path d="M1 31H12" stroke="currentColor" strokeWidth="2" className="blueprint-line" />
              </svg>
              
              <svg className="absolute bottom-0 right-0 w-8 h-8 text-accent/60" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31 31V20" stroke="currentColor" strokeWidth="2" className="blueprint-line" />
                <path d="M31 31H20" stroke="currentColor" strokeWidth="2" className="blueprint-line" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#revolution" className="text-foreground/60 hover:text-foreground transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
