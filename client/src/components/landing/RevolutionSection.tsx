import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const RevolutionSection = () => {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <section id="revolution" className="py-20 relative overflow-hidden">
      <div className="blueprint-bg absolute inset-0 opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-title font-bold mb-4">
            <span className="bg-gradient-primary text-transparent bg-clip-text">{t('revolution.title1')}</span> {t('revolution.title2')}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('revolution.description')}
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="neumorph rounded-xl p-6 bg-background/80">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-accent font-mono text-sm mb-1">{t('revolution.stats.time')}</span>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">83%</span>
                      <span className="text-green-400 text-sm ml-2">↓ {t('revolution.stats.faster')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-accent font-mono text-sm mb-1">{t('revolution.stats.accuracy')}</span>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">98%</span>
                      <span className="text-green-400 text-sm ml-2">{t('revolution.stats.precision')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-primary/10 rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('revolution.benefits.costEffective')}</h3>
                      <p className="text-sm text-foreground/70">{t('revolution.benefits.savingDescription')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-primary/10 rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('revolution.benefits.lightningFast')}</h3>
                      <p className="text-sm text-foreground/70">{t('revolution.benefits.fastDescription')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-primary/10 rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3.5a6.5 6.5 0 106.5 6.5V10a.75.75 0 011.5 0v.5a8 8 0 11-8-8 .75.75 0 010 1.5z" clipRule="evenodd" />
                        <path d="M12.78 7.22a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06 0l-.75-.75a.75.75 0 011.06-1.06l.22.22 1.72-1.72a.75.75 0 011.06 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">{t('revolution.benefits.aiPowered')}</h3>
                      <p className="text-sm text-foreground/70">{t('revolution.benefits.aiDescription')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <svg className="absolute -bottom-8 -right-8 w-32 h-32 opacity-30 z-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#00e8fc" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#00e8fc" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#00e8fc" strokeWidth="0.5" strokeDasharray="2,2" />
              </svg>
              
              <svg className="absolute -top-8 -left-8 w-24 h-24 opacity-30 z-0" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="80" height="80" fill="none" stroke="#00e8fc" strokeWidth="0.5" strokeDasharray="5,5" />
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="#00e8fc" strokeWidth="0.5" strokeDasharray="5,5" />
              </svg>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-title font-bold mb-6">
              {t('revolution.steps.title')} <span className="text-accent">{t('revolution.steps.titleHighlight')}</span>
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-accent font-mono font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('revolution.steps.oldWay')}</h4>
                  <p className="text-foreground/70">{t('revolution.steps.oldDescription')}</p>
                </div>
              </div>
              
              <div className="w-0.5 h-6 bg-accent/30 ml-5"></div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-accent font-mono font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('revolution.steps.newWay')}</h4>
                  <p className="text-foreground/70">{t('revolution.steps.newDescription')}</p>
                </div>
              </div>
              
              <div className="w-0.5 h-6 bg-accent/30 ml-5"></div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                  <span className="text-accent font-mono font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('revolution.steps.result')}</h4>
                  <p className="text-foreground/70">{t('revolution.steps.resultDescription')}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <a href="#features" className="inline-flex items-center px-6 py-3 bg-transparent border border-accent text-accent rounded-full hover:bg-accent/10 transition-colors font-medium">
                {t('revolution.steps.discover')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RevolutionSection;
