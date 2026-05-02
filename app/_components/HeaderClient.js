"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeaderClient({ logo, navigation }) {
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".header-logo", {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.from(".header-nav li", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.2,
    });
  }, { scope: headerRef });

  return (
    <header ref={headerRef} className="border-b border-primary-900 px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="header-logo">{logo}</div>
        <div className="header-nav">{navigation}</div>
      </div>
    </header>
  );
}
