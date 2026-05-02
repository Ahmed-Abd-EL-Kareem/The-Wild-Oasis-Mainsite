import React from "react";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";
import CabinListClient from "./CabinListClient";

export default async function CabinList({ filter }) {
  noStore();
  const cabins = await getCabins();
  if (!cabins.length) return null;
  let displayedCabins;

  if (filter === "all") {
    displayedCabins = cabins;
  }
  if (filter === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 3 && cabin.maxCapacity < 8
    );
  }
  if (filter === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return <CabinListClient cabins={displayedCabins} filter={filter} />;
}
