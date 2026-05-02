"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function LoginMessage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".login-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    },
    { scope: containerRef }
  );

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn("google", { callbackUrl: window.location.pathname });
  };

  return (
    <div
      ref={containerRef}
      className="grid bg-primary-800 p-6 sm:p-8 lg:p-10"
    >
      <div className="self-center space-y-6 login-content">
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-semibold text-accent-400">
            Welcome to The Wild Oasis
          </h3>
          <p className="text-primary-200 text-base sm:text-lg">
            Please login to reserve this cabin and manage your bookings
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={handleSignIn}
            className="bg-accent-500 hover:bg-accent-600 text-primary-800 font-semibold py-3 px-6 rounded-sm transition-colors"
          >
            Sign in with Google
          </button>

          <div className="text-center text-primary-300 text-sm">
            or{" "}
            <Link href="/login" className="text-accent-400 hover:underline">
              sign in with email
            </Link>
          </div>
        </div>

        <div className="border-t border-primary-700 pt-4 mt-4">
          <p className="text-center text-primary-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/login" className="text-accent-400 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginMessage;