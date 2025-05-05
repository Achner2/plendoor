import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Find all elements with the slide-in class
  const slideInElements = document.querySelectorAll('.slide-in');
  
  slideInElements.forEach((el, index) => {
    const delay = index * 0.1; // stagger effect
    
    gsap.fromTo(
      el,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );
  });
};

export const drawSVGLines = () => {
  const svgLines = document.querySelectorAll('.blueprint-line');
  
  svgLines.forEach((line) => {
    gsap.fromTo(
      line,
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line,
          start: 'top bottom',
          toggleActions: 'play none none none'
        }
      }
    );
  });
};

export const animateNumbers = (element: HTMLElement, start: number, end: number, duration: number = 2, prefix: string = '', suffix: string = '') => {
  let startTime: number | null = null;
  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = `${prefix}${value}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

export const initParallaxElements = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
    
    gsap.to(el, {
      y: `${speed * 100}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};
