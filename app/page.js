import Image from "next/image";
import Link from "next/link";
import background from "@/public/bg.png";
export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={background}
        fill
        className="object-cover object-top"
        placeholder="blur"
        quality={80}
        alt="Mountains and forests with two cabins"
        priority
      />

      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl text-primary-50 mb-6 sm:mb-8 lg:mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-6 sm:px-8 py-4 sm:py-6 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all inline-block"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
