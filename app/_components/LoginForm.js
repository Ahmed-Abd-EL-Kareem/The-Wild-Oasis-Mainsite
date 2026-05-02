"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { signInWithEmailAction } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

export default function LoginForm() {
  const formRef = useRef(null);
  const [error, setError] = useState(null);

  useGSAP(
    () => {
      gsap.from(".login-field", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    { scope: formRef }
  );

  const handleSubmit = async (formData) => {
    setError(null);
    const result = await signInWithEmailAction(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-col gap-5 sm:gap-6 w-full max-w-md mx-auto"
    >
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-sm text-sm login-field">
          {error}
        </div>
      )}

      <div className="space-y-2 login-field">
        <label htmlFor="email" className="text-sm font-medium text-primary-200">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="you@example.com"
          className="px-4 py-3 bg-primary-900 border border-primary-700 text-primary-100 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500"
        />
      </div>

      <div className="space-y-2 login-field">
        <label htmlFor="password" className="text-sm font-medium text-primary-200">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Enter your password"
          className="px-4 py-3 bg-primary-900 border border-primary-700 text-primary-100 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500"
        />
      </div>

      <div className="login-field pt-2">
        <SubmitButton pendingLabel="Signing in...">Sign In</SubmitButton>
      </div>
    </form>
  );
}
