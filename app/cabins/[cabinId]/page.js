// "use client";

import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { cabinId } = await params; // ✅ await params first
  const cabin = await getCabin(cabinId);
  const { name, description } = cabin;
  return {
    title: `Cabin ${name} `,
    description: description,
  };
}
export async function generateStaticParams() {
  const cabins = await getCabins();
  const id = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return id;
}
export default async function Page({ params }) {
  const { cabinId } = await params; // ✅ await params first
  const cabin = await getCabin(cabinId);
  return (
    <div className="max-w-6xl mx-auto mt-4 sm:mt-6 lg:mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-6 sm:mb-8 lg:mb-10 text-accent-400 px-4">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
