import { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, duration }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const animationFrameId = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && !isAnimating.current) {
        startCountAnimation();
      } else if (!entry.isIntersecting) {
        // Reset count when element leaves viewport
        setCount(0);
        // Cancel any ongoing animation
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
        isAnimating.current = false;
      }
    }, {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '20px' // Add a small margin to prevent rapid toggling
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      // Clean up animation frame on unmount
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [target, duration]);

  const startCountAnimation = () => {
    // Don't start if already animating
    if (isAnimating.current) return;
    
    isAnimating.current = true;
    const startTime = performance.now();
    const endTime = startTime + duration;
    
    const animate = (currentTime) => {
      if (currentTime >= endTime) {
        setCount(target);
        isAnimating.current = false;
        animationFrameId.current = null;
        return;
      }
      
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * target);
      
      setCount(currentCount);
      
      if (currentCount < target) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        isAnimating.current = false;
        animationFrameId.current = null;
      }
    };
    
    // Reset before starting new animation
    setCount(0);
    animationFrameId.current = requestAnimationFrame(animate);
  };

  return (
    <span ref={elementRef} style={{background:"transparent", color: "#fff", fontWeight: "bold"}}>
      {count}
    </span>
  );
};

// Usage example:
const Counter = ({ target, duration }) => {
  return (
    <div>
      <AnimatedCounter target={target} duration={duration} />
    </div>
  );
};

export default Counter;