"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SignInButton from "@/app/_components/SignInButton";
import LoginForm from "@/app/_components/LoginForm";
import RegisterForm from "@/app/_components/RegisterForm";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("login");
  const [successMessage, setSuccessMessage] = useState("");
  const pageRef = useRef(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("registered") === "1") {
      setActiveTab("login");
      setSuccessMessage("Account created successfully! Please sign in.");
    }
  }, [searchParams]);

  useGSAP(
    () => {
      gsap.from(".login-container", {
        opacity: 0,
        scale: 0.92,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".login-title", {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: "back.out(1.4)",
        delay: 0.2,
      });
      gsap.from(".login-divider", {
        scaleX: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.4,
      });
    },
    { scope: pageRef }
  );

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    console.log(tab);

    setActiveTab(tab);
    setSuccessMessage("");
  };

  return (
    <div
      ref={pageRef}
      className="flex flex-col items-center px-4 mt-8 sm:mt-12 lg:mt-16"
    >
      <div className="login-container w-full max-w-lg">
        <h2 className="login-title text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-10">
          {activeTab === "login"
            ? "Welcome back"
            : "Create your account"}
        </h2>

        <div className="flex border-b border-primary-700 mb-8">
          <button
            onClick={() => switchTab("login")}
            className={`flex-1 pb-3 text-base sm:text-lg font-medium transition-all relative ${activeTab === "login"
                ? "text-accent-400"
                : "text-primary-400 hover:text-primary-200"
              }`}
          >
            Sign In
            {activeTab === "login" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500" />
            )}
          </button>
          <button
            onClick={() => switchTab("register")}
            className={`flex-1 pb-3 text-base sm:text-lg font-medium transition-all relative ${activeTab === "register"
                ? "text-accent-400"
                : "text-primary-400 hover:text-primary-200"
              }`}
          >
            Register
            {activeTab === "register" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500" />
            )}
          </button>
        </div>

        {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

        {successMessage && activeTab === "login" && (
          <div className="mt-4 bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-sm text-sm text-center">
            {successMessage}
          </div>
        )}

        <div className="login-divider flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-primary-700" />
          <span className="text-primary-500 text-sm">or</span>
          <div className="flex-1 h-px bg-primary-700" />
        </div>

        <div className="flex justify-center">
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
