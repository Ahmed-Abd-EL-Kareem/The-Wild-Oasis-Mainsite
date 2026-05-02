import CabinList from "@/app/_components/CabinList";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
import CabinsClient from "./CabinsClient";

export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  const { capacity } = await searchParams;
  const filter = capacity ?? "all";

  return (
    <CabinsClient filter={filter}>
      <div className="flex justify-center sm:justify-end mb-6 sm:mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </CabinsClient>
  );
}
