import ReservationForm from "@/app/_components/ReservationForm";
import DateSelector from "@/app/_components/DateSelector";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "@/app/_components/LoginMessage";

export default async function Reservation({ cabin }) {
  const session = await auth();

  let settings = { minBookingLength: 1, maxBookingLength: 7 };
  let bookedDates = [];

  try {
    [settings, bookedDates] = await Promise.all([
      getSettings(session?.accessToken),
      getBookedDatesByCabinId(cabin.id),
    ]);
  } catch (error) {
    console.warn("Failed to load settings, using defaults:", error.message);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
