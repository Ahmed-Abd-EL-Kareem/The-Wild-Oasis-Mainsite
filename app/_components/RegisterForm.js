"use client";
import { useRef, useState } from "react";
import { signUpAction } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";
import SelectCountry from "./SelectCountry";

export default function RegisterForm() {
  const formRef = useRef(null);
  const [error, setError] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = async (formData) => {
    setError(null);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);

    const result = await signUpAction(formData);
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
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-sm text-sm register-field">
          {error}
        </div>
      )}

      <div className="space-y-2 register-field">
        <label htmlFor="fullName" className="text-sm font-medium text-primary-200">
          Full name
        </label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          required
          placeholder="John Doe"
          className="px-4 py-3 bg-primary-900 border border-primary-700 text-primary-100 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500"
        />
      </div>

      <div className="space-y-2 register-field">
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

      <div className="space-y-2 register-field">
        <label htmlFor="nationality" className="text-sm font-medium text-primary-200">
          Nationality
        </label>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-4 py-3 bg-primary-900 border border-primary-700 text-primary-100 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          defaultCountry=""
        />
      </div>

      <div className="space-y-2 register-field">
        <label htmlFor="nationalID" className="text-sm font-medium text-primary-200">
          National ID number
        </label>
        <input
          type="text"
          name="nationalID"
          id="nationalID"
          placeholder="Passport or national ID"
          className="px-4 py-3 bg-primary-900 border border-primary-700 text-primary-100 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500"
        />
      </div>

      <div className="space-y-2 register-field">
        <label htmlFor="password" className="text-sm font-medium text-primary-200">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          placeholder="At least 6 characters"
          className="px-4 py-3 bg-primary-900 border border-primary-700 text-primary-100 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500"
        />
      </div>

      <div className="space-y-2 register-field">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-primary-200">
          Confirm password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          placeholder="Re-enter your password"
          className={`px-4 py-3 bg-primary-900 border text-primary-100 w-full shadow-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500 ${
            !passwordMatch ? "border-red-500" : "border-primary-700"
          }`}
        />
        {!passwordMatch && (
          <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
        )}
      </div>

      <div className="register-field pt-2">
        <SubmitButton pendingLabel="Creating account...">Create Account</SubmitButton>
      </div>
    </form>
  );
}
