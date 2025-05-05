import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BlueprintLineProps {
  d: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  strokeColor?: string;
  className?: string;
}

const BlueprintLine = ({
  d,
  delay = 0,
  duration = 2.5,
  strokeWidth = 2,
  strokeColor = '#00e8fc',
  className = '',
}: BlueprintLineProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    if (pathRef.current) {
      const path = pathRef.current;
      
      // Set up the path
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      
      // Animate path
      gsap.to(path, {
        strokeDashoffset: 0,
        duration,
        delay,
        ease: 'power2.out'
      });
    }
  }, [delay, duration]);
  
  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      className={`blueprint-line ${className}`}
    />
  );
};

export default BlueprintLine;
