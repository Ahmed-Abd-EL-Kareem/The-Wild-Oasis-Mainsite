"use client";
import { useRef } from "react";
import ReservationCard from "@/app/_components/ReservationCard";
import { deleteBooking } from "@/app/_lib/actions";
import { useOptimistic } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ReservationList({ bookings }) {
  const listRef = useRef(null);
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  useGSAP(
    () => {
      gsap.from(".reservation-card", {
        x: -40,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.12,
      });
    },
    { scope: listRef, dependencies: [optimisticBookings] }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul ref={listRef} className="space-y-4 sm:space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
