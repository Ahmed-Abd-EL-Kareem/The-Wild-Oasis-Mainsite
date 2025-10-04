"use client";
import Image from "next/image";
import { useState } from "react";
import { updateGuest } from "@/app/_lib/actions";
import SubmitButton from "@/app/_components/SubmitButton";

export default function UpdateProfileForm({ guest, children }) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest;
  // console.log(countryFlag);
  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-6 sm:py-8 px-6 sm:px-8 lg:px-12 text-base sm:text-lg flex gap-4 sm:gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          disabled
          defaultValue={fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email}
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="relative w-6 aspect-square">
            <Image
              fill
              src={`${countryFlag}`}
              alt="Country flag"
              className="h-5 rounded-sm object-cover"
            />
          </div>
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>
      <div className="flex justify-center sm:justify-end items-center gap-4 sm:gap-6">
        <SubmitButton pendingLabel="Updating...">Update Profile</SubmitButton>
      </div>
    </form>
  );
}
