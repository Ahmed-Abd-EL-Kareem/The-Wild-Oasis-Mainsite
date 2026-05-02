"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const containerRef = useRef(null);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (isInitial) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      setIsInitial(false);
      return;
    }

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [children, isInitial]);

  return (
    <div ref={containerRef} className="page-transition-container">
      {children}
    </div>
  );
}
