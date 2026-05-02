import Image from "next/image";
import Link from "next/link";
import about1 from "@/public/about-1.jpg";
import about2 from "@/public/about-2.jpg";
import { getCabins } from "@/app/_lib/data-service";
import AboutClient from "./AboutClient";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return <AboutClient cabinCount={cabins.length} />;
}
