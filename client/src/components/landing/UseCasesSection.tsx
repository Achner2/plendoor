import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useTranslation } from 'react-i18next';

interface UseCase {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  icon: string;
}

const useCases: UseCase[] = [
  {
    id: 'home-renovation',
    title: 'Home Renovation',
    description: 'Create detailed plans of your existing space to share with contractors, designers, and architects. Save thousands on preliminary design work.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'RESIDENTIAL',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    description: 'Instantly generate accurate floor plans that serve as the foundation for interior design projects. Seamlessly export to design software.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'DESIGN',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Enhance property listings with professional floor plans in minutes. Improve buyer interest and provide complete property information.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'COMMERCIAL',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    id: 'office-planning',
    title: 'Office Space Planning',
    description: 'Quickly document existing office layouts and plan optimized configurations for collaboration, productivity, and social distancing.',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'BUSINESS',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    id: 'retail-optimization',
    title: 'Retail Space Optimization',
    description: 'Design optimal store layouts to maximize customer flow, product visibility, and sales area. Test different configurations digitally.',
    image: 'https://mac-center.com/cdn/shop/files/1686874260568_1500x.jpg?v=1686928395',
    category: 'RETAIL',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    id: 'event-planning',
    title: 'Event Planning',
    description: 'Create precise venue layouts for weddings, conferences, and events. Plan seating arrangements, stages, and service areas with accuracy.',
    image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    category: 'EVENTS',
    icon: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z'
  }
];

const UseCasesSection = () => {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  return (
    <section id="use-cases" className="py-20 bg-gradient-to-b from-background/95 via-background to-background/95 relative">
      <div className="absolute inset-0 blueprint-bg opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-title font-bold mb-4">
            {t('useCases.title1')} <span className="bg-gradient-primary text-transparent bg-clip-text">{t('useCases.title2')}</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {t('useCases.description')}
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              variants={itemVariants}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:translate-y-[-8px] cursor-pointer"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="h-48 rounded-lg overflow-hidden mb-6">
                <img 
                  src={useCase.image}
                  alt={useCase.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <h3 className="text-xl font-title font-bold mb-3">{t(`useCases.cases.${useCase.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}.title`)}</h3>
              <p className="text-foreground/70 mb-4">
                {t(`useCases.cases.${useCase.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}.description`)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-accent text-sm font-mono">{t(`useCases.categories.${useCase.category.toLowerCase()}`)}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={useCase.icon} />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
