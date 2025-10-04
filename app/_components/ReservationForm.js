"use client";

import { useReservation } from "@/app/_components/ReservationContext";
import Image from "next/image";
import { createBooking } from "@/app/_lib/actions";
import { differenceInDays } from "date-fns";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, restRange } = useReservation();
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);
  return (
    <div className="scale-[1.01] overflow-hidden">
      <div className="bg-primary-800 text-primary-300 px-4 sm:px-8 lg:px-16 py-2 flex justify-between items-center">
        <p className="text-sm sm:text-base">Logged in as</p>

        <div className="flex gap-2 sm:gap-4 items-center">
          <div className="relative h-6 w-6 sm:h-8 sm:w-8 aspect-square">
            <Image
              // Important to display google profile images
              referrerPolicy="no-referrer"
              fill
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
              src={user.image}
              alt={user.name}
            />
          </div>
          <p className="text-sm sm:text-base truncate max-w-32 sm:max-w-none">
            {user.name}
          </p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          restRange();
        }}
        className="bg-primary-900 h-full py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-16 text-base sm:text-lg flex gap-4 sm:gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-center sm:justify-end items-center gap-4 sm:gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-sm sm:text-base text-center sm:text-left">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve Now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
