"use client";
import { useRef } from "react";
import TextExpander from "@/app/_components/TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;
  const cabinRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".cabin-image", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.from(".cabin-title", {
        x: -60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".cabin-description", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out",
      });
      gsap.from(".cabin-feature", {
        x: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
      });
    },
    { scope: cabinRef }
  );

  return (
    <div ref={cabinRef} className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-8 lg:gap-20 border border-primary-800 py-3 px-4 sm:px-6 lg:px-10 mb-12 sm:mb-16 lg:mb-24">
      <div className="cabin-image relative scale-[1.15] -translate-x-3 order-2 lg:order-1 overflow-hidden rounded-sm">
        <Image
          fill
          className="object-cover hover:scale-105 transition-transform duration-700"
          src={image}
          alt={`Cabin ${name}`}
        />
      </div>

      <div className="order-1 lg:order-2">
        <h3 className="cabin-title text-accent-100 font-black text-4xl sm:text-5xl lg:text-7xl mb-5 translate-x-0 lg:translate-x-[-254px] bg-primary-950 p-4 sm:p-6 pb-1 w-full lg:w-[150%]">
          Cabin {name}
        </h3>

        <p className="cabin-description text-base sm:text-lg text-primary-300 mb-6 sm:mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-3 sm:gap-4 mb-7">
          <li className="cabin-feature flex gap-3 items-center">
            <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="cabin-feature flex gap-3 items-center">
            <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="cabin-feature flex gap-3 items-center">
            <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
