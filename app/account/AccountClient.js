"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AccountPage({ firstName }) {
  const pageRef = useRef(null);

  useGSAP(() => {
    gsap.from(".account-welcome", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }, { scope: pageRef });

  return (
    <main ref={pageRef}>
      <h2 className="account-welcome font-semibold text-xl sm:text-2xl text-accent-400 mb-6 sm:mb-7">
        Welcome, {firstName}
      </h2>
    </main>
  );
}
