import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface FeatureTab {
  id: string;
  title: string;
  description: string;
}

interface FeatureContent {
  id: string;
  title: string;
  description: string;
  image: string;
  benefits: string[];
}

const FeaturesSection = () => {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  const [activeFeature, setActiveFeature] = useState('scan');
  
  // We'll load the feature tabs from the translations
  const featureTabs: FeatureTab[] = [
    {
      id: 'scan',
      title: t('features.scan.title'),
      description: t('features.scan.description')
    },
    {
      id: 'generate',
      title: t('features.generate.title'),
      description: t('features.generate.description')
    },
    {
      id: 'customize',
      title: t('features.customize.title'),
      description: t('features.customize.description')
    },
    {
      id: 'export',
      title: t('features.export.title'),
      description: t('features.export.description')
    },
    {
      id: 'collaborate',
      title: t('features.collaborate.title'),
      description: t('features.collaborate.description')
    }
  ];
  
  // Maps for the images - these don't need translation
  const featureImages = {
    scan: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    generate: 'https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    customize: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    export: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    collaborate: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80'
  };
  
  // Generate the feature contents from translations
  const getFeatureContent = (id: string): FeatureContent => {
    return {
      id,
      title: t(`features.${id}.detailedTitle`),
      description: t(`features.${id}.detailedDescription`),
      image: featureImages[id as keyof typeof featureImages],
      benefits: [
        t(`features.${id}.benefits.0`),
        t(`features.${id}.benefits.1`),
        t(`features.${id}.benefits.2`)
      ]
    };
  };
  
  // Create the feature contents object
  const featureContents: Record<string, FeatureContent> = {
    scan: getFeatureContent('scan'),
    generate: getFeatureContent('generate'),
    customize: getFeatureContent('customize'),
    export: getFeatureContent('export'),
    collaborate: getFeatureContent('collaborate')
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] } }
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background via-background/95 to-background relative">
      <div className="absolute inset-0 blueprint-bg opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-title font-bold mb-4">
            {t('features.title1')} <span className="bg-gradient-primary text-transparent bg-clip-text">{t('features.title2')}</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('features.description')}
          </p>
        </motion.div>
        
        {/* Features carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12 neumorph">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5">
                <div className="space-y-4 sticky top-24">
                  {featureTabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`feature-tab w-full text-left px-5 py-4 rounded-xl transition-colors ${
                        activeFeature === tab.id
                          ? 'bg-primary/20 border-l-4 border-accent'
                          : 'bg-background border-l-4 border-transparent hover:bg-primary/10'
                      }`}
                      onClick={() => setActiveFeature(tab.id)}
                    >
                      <h3 className="font-title font-bold text-xl mb-1">{tab.title}</h3>
                      <p className="text-foreground/70 text-sm">{tab.description}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-7">
                <div className="h-full flex items-center justify-center">
                  {Object.values(featureContents).map((content) => (
                    <div
                      key={content.id}
                      className={`feature-content w-full ${activeFeature === content.id ? 'block' : 'hidden'}`}
                    >
                      <div className="relative neumorph rounded-xl overflow-hidden">
                        <img 
                          src={content.image}
                          alt={content.title} 
                          className="w-full h-auto rounded-xl"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                          {content.id === 'scan' && (
                            <svg width="100%" height="100%" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
                              <line x1="0" y1="150" x2="500" y2="150" stroke="#00e8fc" strokeWidth="2" opacity="0.7">
                                <animateTransform attributeName="transform" type="translate" from="0 -150" to="0 150" dur="2s" repeatCount="indefinite" />
                              </line>
                              <path d="M50,50 L450,50 L450,250 L50,250 Z" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line" opacity="0.8"></path>
                              <text x="250" y="40" textAnchor="middle" fill="#00e8fc" fontFamily="monospace" fontSize="12">12.5 m</text>
                              <text x="460" y="150" textAnchor="start" fill="#00e8fc" fontFamily="monospace" fontSize="12">6.2 m</text>
                            </svg>
                          )}

                          {content.id === 'generate' && (
                            <svg width="100%" height="100%" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
                              <rect x="50" y="50" width="400" height="200" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></rect>
                              <line x1="150" y1="50" x2="150" y2="250" stroke="#00e8fc" strokeWidth="2" strokeDasharray="5,5" className="blueprint-line"></line>
                              <line x1="350" y1="50" x2="350" y2="250" stroke="#00e8fc" strokeWidth="2" strokeDasharray="5,5" className="blueprint-line"></line>
                              <rect x="50" y="130" width="30" height="70" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></rect>
                              <path d="M50,130 A30,30 0 0,1 80,160" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></path>
                            </svg>
                          )}

                          {content.id === 'customize' && (
                            <svg width="100%" height="100%" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
                              <rect x="50" y="50" width="400" height="200" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></rect>
                              <circle cx="125" cy="125" r="25" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></circle>
                              <rect x="300" y="100" width="100" height="60" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></rect>
                              <path d="M250,50 L250,250" stroke="#00e8fc" strokeWidth="2" strokeDasharray="10,10" className="blueprint-line"></path>
                              <text x="125" y="125" textAnchor="middle" fill="#00e8fc" fontFamily="monospace" fontSize="10">DRAG</text>
                            </svg>
                          )}

                          {content.id === 'export' && (
                            <svg width="100%" height="100%" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
                              <rect x="100" y="50" width="300" height="200" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></rect>
                              <text x="250" y="150" textAnchor="middle" fill="#00e8fc" fontFamily="monospace" fontSize="20">PDF</text>
                              <text x="180" y="190" textAnchor="middle" fill="#00e8fc" fontFamily="monospace" fontSize="16">DWG</text>
                              <text x="320" y="190" textAnchor="middle" fill="#00e8fc" fontFamily="monospace" fontSize="16">3D</text>
                              <path d="M220,250 L280,250" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></path>
                              <path d="M250,230 L250,270" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></path>
                            </svg>
                          )}

                          {content.id === 'collaborate' && (
                            <svg width="100%" height="100%" viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
                              <rect x="70" y="70" width="360" height="160" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></rect>
                              <circle cx="150" cy="110" r="20" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></circle>
                              <circle cx="250" cy="110" r="20" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></circle>
                              <circle cx="350" cy="110" r="20" fill="none" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></circle>
                              <line x1="150" y1="150" x2="150" y2="190" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></line>
                              <line x1="250" y1="150" x2="250" y2="190" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></line>
                              <line x1="350" y1="150" x2="350" y2="190" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></line>
                              <line x1="120" y1="190" x2="380" y2="190" stroke="#00e8fc" strokeWidth="2" className="blueprint-line"></line>
                            </svg>
                          )}
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                            <p className="font-mono text-accent text-sm">
                              {t(`features.status.${content.id}`)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-title font-bold text-xl mb-2">{content.title}</h4>
                        <p className="text-foreground/80">
                          {content.description}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {content.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
