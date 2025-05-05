import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const DemoSection = () => {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section id="demo" className="py-20 relative overflow-hidden">
      <div className="blueprint-bg absolute inset-0 opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-title font-bold mb-4">
            {t('demo.title1')} <span className="bg-gradient-primary text-transparent bg-clip-text">{t('demo.title2')}</span> {t('demo.title3')}
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('demo.description')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Visual demo/workflow display */}
            <div className="relative">
              <div className="neumorph rounded-xl overflow-hidden p-1 bg-background/80">
                <div 
                  ref={sliderRef}
                  className="relative h-[400px] cursor-ew-resize overflow-hidden"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Before image */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Room before" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* After image */}
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1630699144339-420f59b4747a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Floor plan after" 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Plano arquitectónico */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="80%" height="80%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                        <rect x="20" y="20" width="360" height="260" fill="none" stroke="#00e8fc" strokeWidth="2" opacity="0.8"></rect>
                        <line x1="20" y1="150" x2="380" y2="150" stroke="#00e8fc" strokeWidth="1" strokeDasharray="5,5" opacity="0.8"></line>
                        <rect x="20" y="20" width="100" height="130" fill="none" stroke="#00e8fc" strokeWidth="1" opacity="0.8"></rect>
                        <rect x="120" y="20" width="140" height="130" fill="none" stroke="#00e8fc" strokeWidth="1" opacity="0.8"></rect>
                        <rect x="260" y="20" width="120" height="130" fill="none" stroke="#00e8fc" strokeWidth="1" opacity="0.8"></rect>
                        <text x="70" y="85" fontFamily="monospace" fill="#00e8fc" fontSize="12" textAnchor="middle">Kitchen</text>
                        <text x="190" y="85" fontFamily="monospace" fill="#00e8fc" fontSize="12" textAnchor="middle">Living Room</text>
                        <text x="320" y="85" fontFamily="monospace" fill="#00e8fc" fontSize="12" textAnchor="middle">Dining</text>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Slider control */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-accent"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-background" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-10">
              {/* Step 1 */}
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-6">
                  <span className="text-3xl font-mono text-accent font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-title font-bold mb-3">{t('demo.step1.title')}</h3>
                  <p className="text-foreground/70 mb-4">
                    {t('demo.step1.description')}
                  </p>
                  <div className="flex items-center space-x-4 text-foreground/60 text-sm">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg> 
                      {t('demo.step1.worksOnSmartphone')}
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg> 
                      {t('demo.step1.takesUnder')}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Connector */}
              <div className="flex">
                <div className="flex-shrink-0 w-12 mr-6 flex justify-center">
                  <div className="w-0.5 h-full bg-accent/30"></div>
                </div>
                <div className="text-accent font-mono">
                  {t('demo.processing')}
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-6">
                  <span className="text-3xl font-mono text-accent font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-2xl font-title font-bold mb-3">{t('demo.step2.title')}</h3>
                  <p className="text-foreground/70 mb-4">
                    {t('demo.step2.description')}
                  </p>
                  <div className="flex items-center space-x-4 text-foreground/60 text-sm">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg> 
                      {t('demo.step2.instantGeneration')}
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg> 
                      {t('demo.step2.professionalStandard')}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Connector */}
              <div className="flex">
                <div className="flex-shrink-0 w-12 mr-6 flex justify-center">
                  <div className="w-0.5 h-full bg-accent/30"></div>
                </div>
                <div className="text-accent font-mono">
                  {t('demo.finalizing')}
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-6">
                  <span className="text-3xl font-mono text-accent font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-2xl font-title font-bold mb-3">{t('demo.step3.title')}</h3>
                  <p className="text-foreground/70 mb-4">
                    {t('demo.step3.description')}
                  </p>
                  <div className="flex items-center space-x-4 text-foreground/60 text-sm">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg> 
                      {t('demo.step3.multipleFormats')}
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg> 
                      {t('demo.step3.oneClickSharing')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
