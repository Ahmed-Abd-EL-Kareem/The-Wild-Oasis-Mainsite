"use client";
import { useRef } from "react";
import SideNavigation from "@/app/_components/SideNavigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AccountLayout({ children }) {
  const layoutRef = useRef(null);

  useGSAP(() => {
    gsap.from(".account-sidebar", {
      x: -30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.from(".account-content", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }, { scope: layoutRef });

  return (
    <div ref={layoutRef} className="flex flex-col lg:grid lg:grid-cols-[16rem_1fr] min-h-screen gap-6 lg:gap-12">
      <div className="flex-1 lg:order-2">
        <div className="account-content py-1 pb-20 lg:pb-1">{children}</div>
      </div>
      <div className="account-sidebar order-2 lg:order-1 lg:mt-0 mt-auto">
        <SideNavigation />
      </div>
    </div>
  );
}
