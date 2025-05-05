import { useEffect, useState, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: () => void;
  /**
   * If true, once the element appears, it will stay visible even when scrolling away
   * Default is true to keep elements visible after they're shown
   */
  stayVisible?: boolean;
}

export function useIntersectionObserver<T extends Element>({
  root = null,
  rootMargin = '0px',
  threshold = 0.1,
  onIntersect,
  stayVisible = true, // Default to true to keep elements visible after animation
}: UseIntersectionObserverProps = {}): [RefObject<T>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If stayVisible is true and element has been intersected before,
        // keep it in the "visible" state
        if (stayVisible && hasIntersected) {
          setIntersecting(true);
          return;
        }
        
        // For the first intersection or if stayVisible is false
        if (entry.isIntersecting) {
          setHasIntersected(true);
          setIntersecting(true);
          
          if (onIntersect) {
            onIntersect();
          }
          
          // If we want elements to stay visible once they appear,
          // we can unobserve them after they've been seen
          if (stayVisible && currentTarget) {
            observer.unobserve(currentTarget);
          }
        } else {
          // Only change to not intersecting if we don't want to keep visible
          if (!stayVisible) {
            setIntersecting(false);
          }
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const currentTarget = targetRef.current;

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [root, rootMargin, threshold, onIntersect, stayVisible, hasIntersected]);

  return [targetRef, isIntersecting];
}
