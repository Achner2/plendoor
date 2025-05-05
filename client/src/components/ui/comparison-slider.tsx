import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  initialPosition?: number;
  blueprintOverlay?: React.ReactNode;
  height?: string | number;
}

/**
 * A slider component for comparing two images (before/after) with an interactive divider
 */
const ComparisonSlider = ({
  beforeImage,
  afterImage,
  beforeAlt = "Before image",
  afterAlt = "After image",
  className,
  initialPosition = 50,
  blueprintOverlay,
  height = "400px",
}: ComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

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

  const updateSliderPosition = (clientX: number) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPosition = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateSliderPosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    updateSliderPosition(e.touches[0].clientX);
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

  return (
    <div 
      ref={sliderRef}
      style={{ height }}
      className={cn(
        "relative cursor-ew-resize overflow-hidden rounded-xl",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Before image (clips from left edge to slider position) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={beforeImage} 
          alt={beforeAlt} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* After image (full width, positioned behind the clipped before image) */}
      <div className="absolute inset-0">
        <img 
          src={afterImage} 
          alt={afterAlt} 
          className="w-full h-full object-cover"
        />
        
        {/* Blueprint overlay content if provided */}
        {blueprintOverlay && (
          <div className="absolute inset-0 flex items-center justify-center">
            {blueprintOverlay}
          </div>
        )}
      </div>
      
      {/* Slider control (vertical line with handle) */}
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
  );
};

export default ComparisonSlider;
