import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { apiRequest } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

// Custom hook to get translations outside component
const useFormSchema = () => {
  const { t } = useTranslation();
  
  // Form validation schema
  return z.object({
    name: z.string().min(2, { message: t('earlyAccess.validation.nameRequired') }),
    email: z.string().email({ message: t('earlyAccess.validation.emailInvalid') }),
    profession: z.string().min(1, { message: t('earlyAccess.validation.professionRequired') }),
    terms: z.boolean().refine(val => val === true, { message: t('earlyAccess.validation.termsRequired') })
  });
};

type FormValues = z.infer<ReturnType<typeof useFormSchema>>;

const EarlyAccessSection = () => {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const formSchema = useFormSchema();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      profession: '',
      terms: false
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/early-access', data);
      toast({
        title: t('earlyAccess.form.successTitle'),
        description: t('earlyAccess.form.successMessage'),
        variant: "default",
      });
      reset();
    } catch (error) {
      toast({
        title: t('earlyAccess.form.errorTitle'),
        description: t('earlyAccess.form.errorMessage'),
        variant: "destructive",
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="early-access" className="py-20 relative overflow-hidden">
      <div className="blueprint-bg absolute inset-0 opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="max-w-4xl mx-auto glass-card rounded-2xl p-8 md:p-12 neumorph"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-title font-bold mb-4">
                {t('earlyAccess.title1')} <span className="bg-gradient-primary text-transparent bg-clip-text">{t('earlyAccess.title2')}</span>
              </h2>
              <p className="text-foreground/70 mb-6">
                {t('earlyAccess.description')}
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{t('earlyAccess.benefits.benefit1')}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{t('earlyAccess.benefits.benefit2')}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{t('earlyAccess.benefits.benefit3')}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{t('earlyAccess.benefits.benefit4')}</span>
                </li>
              </ul>
              
              <div className="flex items-center text-foreground/60 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{t('earlyAccess.benefits.limitedSpots')}</span>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-foreground/80 mb-2 font-medium">{t('earlyAccess.form.fullName')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    {...register('name')}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.name ? 'border-red-500' : 'border-foreground/10'} focus:border-accent outline-none transition-colors`} 
                    placeholder={t('earlyAccess.form.namePlaceholder')}
                  />
                  {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-foreground/80 mb-2 font-medium">{t('earlyAccess.form.email')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.email ? 'border-red-500' : 'border-foreground/10'} focus:border-accent outline-none transition-colors`} 
                    placeholder={t('earlyAccess.form.emailPlaceholder')}
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="profession" className="block text-foreground/80 mb-2 font-medium">{t('earlyAccess.form.profession')}</label>
                  <select 
                    id="profession" 
                    {...register('profession')}
                    className={`w-full px-4 py-3 rounded-lg bg-background border ${errors.profession ? 'border-red-500' : 'border-foreground/10'} focus:border-accent outline-none transition-colors`}
                  >
                    <option value="" disabled>{t('earlyAccess.form.professionSelect')}</option>
                    <option value="homeowner">{t('earlyAccess.form.homeowner')}</option>
                    <option value="architect">{t('earlyAccess.form.architect')}</option>
                    <option value="interior_designer">{t('earlyAccess.form.interiorDesigner')}</option>
                    <option value="real_estate">{t('earlyAccess.form.realEstate')}</option>
                    <option value="contractor">{t('earlyAccess.form.contractor')}</option>
                    <option value="other">{t('earlyAccess.form.other')}</option>
                  </select>
                  {errors.profession && <p className="mt-1 text-red-500 text-sm">{errors.profession.message}</p>}
                </div>
                
                <div className="flex items-start pt-2">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    {...register('terms')}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="terms" className="text-sm text-foreground/70">
                    {t('earlyAccess.form.terms')} <a href="#" className="text-accent hover:underline">{t('earlyAccess.form.termsOfService')}</a> {t('earlyAccess.form.and')} <a href="#" className="text-accent hover:underline">{t('earlyAccess.form.privacyPolicy')}</a>.
                  </label>
                </div>
                {errors.terms && <p className="mt-1 text-red-500 text-sm">{errors.terms.message}</p>}
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground font-medium transition-all transform hover:scale-105 shadow-lg shadow-primary/20 mt-6 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('common.processing')}
                    </span>
                  ) : t('common.reserve')}
                </button>
                
                <p className="text-center text-foreground/60 text-sm mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  {t('earlyAccess.form.secureInfo')}
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccessSection;
