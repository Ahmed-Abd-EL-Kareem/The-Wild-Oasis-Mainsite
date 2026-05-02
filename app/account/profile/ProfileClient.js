"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProfileClient({ children }) {
  const pageRef = useRef(null);

  useGSAP(() => {
    gsap.from(".profile-title", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.from(".profile-description", {
      y: 15,
      opacity: 0,
      duration: 0.5,
      delay: 0.15,
      ease: "power2.out",
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef}>
      <h2 className="profile-title font-semibold text-xl sm:text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>
      <p className="profile-description text-base sm:text-lg mb-6 sm:mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      {children}
    </div>
  );
}
