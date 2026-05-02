"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnimatedSection({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  stagger = false,
  staggerDelay = 0.1,
  threshold = 0.1,
  triggerOnce = true,
}) {
  const sectionRef = useRef(null);
  const tlRef = useRef(null);

  const animations = {
    fadeUp: { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 } },
    fadeDown: { from: { opacity: 0, y: -40 }, to: { opacity: 1, y: 0 } },
    fadeLeft: { from: { opacity: 0, x: -50 }, to: { opacity: 1, x: 0 } },
    fadeRight: { from: { opacity: 0, x: 50 }, to: { opacity: 1, x: 0 } },
    scaleIn: { from: { opacity: 0, scale: 0.85 }, to: { opacity: 1, scale: 1 } },
    scaleUp: { from: { scale: 0.9, opacity: 0 }, to: { scale: 1, opacity: 1 } },
    slideUp: { from: { y: 60, opacity: 0 }, to: { y: 0, opacity: 1 } },
    slideDown: { from: { y: -60, opacity: 0 }, to: { y: 0, opacity: 1 } },
    slideLeft: { from: { x: 60, opacity: 0 }, to: { x: 0, opacity: 1 } },
    slideRight: { from: { x: -60, opacity: 0 }, to: { x: 0, opacity: 1 } },
    rotateIn: { from: { rotation: -5, scale: 0.9, opacity: 0 }, to: { rotation: 0, scale: 1, opacity: 1 } },
    bounceIn: { from: { scale: 0.3, opacity: 0 }, to: { scale: 1, opacity: 1, ease: "back.out(1.7)" } },
  };

  const selectedAnimation = animations[animation] || animations.fadeUp;

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tlRef.current = gsap.timeline();
              
              if (stagger && sectionRef.current.children) {
                tlRef.current.fromTo(
                  sectionRef.current.children,
                  { ...selectedAnimation.from },
                  {
                    ...selectedAnimation.to,
                    duration,
                    stagger: staggerDelay,
                    delay,
                    ease: selectedAnimation.to.ease || "power2.out",
                  }
                );
              } else {
                tlRef.current.fromTo(
                  sectionRef.current,
                  { ...selectedAnimation.from },
                  {
                    ...selectedAnimation.to,
                    duration,
                    delay,
                    ease: selectedAnimation.to.ease || "power2.out",
                  }
                );
              }

              if (triggerOnce) {
                observer.unobserve(entry.target);
              }
            } else if (!triggerOnce && tlRef.current) {
              tlRef.current.reverse();
            }
          });
        },
        { threshold }
      );

      observer.observe(sectionRef.current);

      return () => observer.disconnect();
    },
    { scope: sectionRef, dependencies: [animation, delay, duration, stagger, threshold, triggerOnce] }
  );

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
