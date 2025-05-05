import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
}

/**
 * A glass-morphism style card component with customizable opacity and hover effects
 */
const GlassCard = ({
  children,
  className,
  hoverEffect = false,
  intensity = 'medium',
  ...props
}: GlassCardProps) => {
  // Configure background opacity based on intensity
  const bgOpacity = {
    light: 'bg-primary/5',
    medium: 'bg-primary/10',
    heavy: 'bg-primary/20',
  };
  
  // Configure border opacity based on intensity
  const borderOpacity = {
    light: 'border-white/5',
    medium: 'border-white/10',
    heavy: 'border-white/20',
  };
  
  return (
    <div
      className={cn(
        `${bgOpacity[intensity]} backdrop-blur-md border ${borderOpacity[intensity]} shadow-lg rounded-xl p-6`,
        hoverEffect && 'transition-all duration-300 hover:-translate-y-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
