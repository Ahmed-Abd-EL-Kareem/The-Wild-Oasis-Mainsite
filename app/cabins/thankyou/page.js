"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Page() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".thankyou-title", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      });
      gsap.from(".thankyou-link", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="text-center space-y-6 mt-4">
      <h1 className="thankyou-title text-3xl font-semibold">
        Thank you for your reservation!
      </h1>
      <Link
        href="/account/reservation"
        className="thankyou-link underline text-xl text-accent-500 inline-block hover:scale-105 transition-transform"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
