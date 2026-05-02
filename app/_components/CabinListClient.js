"use client";
import { useRef } from "react";
import CabinCard from "@/app/_components/CabinCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CabinListClient({ cabins, filter }) {
  const gridRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".cabin-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
      });
    },
    { scope: gridRef, dependencies: [filter] }
  );

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-14"
    >
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
