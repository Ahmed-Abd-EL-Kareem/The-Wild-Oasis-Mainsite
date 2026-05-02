"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import about1 from "@/public/about-1.jpg";
import about2 from "@/public/about-2.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AboutClient({ cabinCount }) {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".about-title-1", {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".about-title-2", {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".about-text-1", {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
      gsap.from(".about-text-2", {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
      gsap.from(".about-image-1", {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
      });
      gsap.from(".about-image-2", {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });
      gsap.from(".about-cta", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.5,
      });
    },
    { scope: pageRef }
  );

  return (
    <div
      ref={pageRef}
      className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-x-24 gap-y-16 lg:gap-y-32 text-base sm:text-lg items-center"
    >
      <div className="col-span-1 lg:col-span-3">
        <h1 className="about-title-1 text-3xl sm:text-4xl mb-6 sm:mb-8 lg:mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-6 sm:space-y-8">
          <p className="about-text-1">
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p className="about-text-1">
            Our {cabinCount} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p className="about-text-1">
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2">
        <div className="about-image-1 overflow-hidden rounded-sm">
          <Image
            placeholder="blur"
            src={about1}
            alt="Family sitting around a fire pit in front of cabin"
            className="hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2 order-3 lg:order-2">
        <div className="about-image-2 overflow-hidden rounded-sm">
          <Image
            src={about2}
            placeholder="blur"
            alt="Family that manages The Wild Oasis"
            className="hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      <div className="col-span-1 lg:col-span-3 order-4 lg:order-3">
        <h1 className="about-title-2 text-3xl sm:text-4xl mb-6 sm:mb-8 lg:mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-6 sm:space-y-8">
          <p className="about-text-2">
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p className="about-text-2">
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div className="about-cta">
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-6 sm:px-8 py-4 sm:py-5 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 hover:scale-105 transition-all"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
