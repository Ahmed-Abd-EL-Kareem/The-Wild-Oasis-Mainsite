"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { updateGuest } from "@/app/_lib/actions";
import { useRouter } from "next/navigation";

function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default function UpdateProfileForm({ guest, children }) {
  const router = useRouter();
  const formRef = useRef(null);
  const successRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { fullName, email, nationalID, avatar } = guest;

  useGSAP(
    () => {
      if (!isSuccess) {
        gsap.from(".profile-field", {
          opacity: 0,
          y: 16,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.08,
        });
      }
    },
    { scope: formRef, dependencies: [isSuccess] }
  );

  useGSAP(
    () => {
      if (isSuccess) {
        gsap.fromTo(
          successRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
        gsap.fromTo(
          ".success-message",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, delay: 0.2, ease: "power2.out" }
        );
      }
    },
    { scope: formRef, dependencies: [isSuccess] }
  );

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await updateGuest(formData);

      if (result?.error) throw new Error(result.error);

      setIsSuccess(true);
      router.refresh();

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="bg-primary-900 py-6 sm:py-8 px-6 sm:px-8 lg:px-12 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col relative overflow-hidden"
    >
      {isSuccess && (
        <div
          ref={successRef}
          className="absolute inset-0 bg-accent-600/90 flex items-center justify-center z-10"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="success-message text-white font-semibold text-xl">
              Profile updated!
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-sm">
          {error}
        </div>
      )}

      <div className="space-y-2 profile-field">
        <label>Full name</label>
        <input
          name="fullName"
          disabled
          defaultValue={fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2 profile-field">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2 profile-field">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {avatar ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                fill
                src={avatar}
                alt="Profile avatar"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
        {children}
      </div>

      <div className="space-y-2 profile-field">
        <label htmlFor="avatar">Profile photo</label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          className="block w-full text-primary-200 file:mr-4 file:rounded-sm file:border-0 file:bg-primary-700 file:px-4 file:py-2 file:text-primary-100 hover:file:bg-primary-600"
        />
      </div>

      <div className="space-y-2 profile-field">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>
      <div className="flex justify-center sm:justify-end items-center gap-4 sm:gap-6 profile-field">
        <SubmitButton pendingLabel="Updating...">Update Profile</SubmitButton>
      </div>
    </form>
  );
}