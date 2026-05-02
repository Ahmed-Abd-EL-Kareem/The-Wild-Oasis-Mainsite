"use client";
import Image from "next/image";
import Link from "next/link";
import background from "@/public/bg.png";

export default function Home() {
  return (
    <main className="relative w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)] -mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-8 lg:-my-12 min-h-[calc(100vh-5rem)] overflow-hidden">
      <Image
        src={background}
        fill
        className="object-cover object-top"
        placeholder="blur"
        quality={80}
        alt="Mountains and forests with two cabins"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/50 to-primary-950/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex min-h-[calc(100vh-7rem)] items-center">
        <div className="w-full grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <section>
            <p className="inline-flex items-center rounded-full border border-primary-700/80 bg-primary-900/70 px-4 py-1.5 text-sm text-primary-200 mb-5">
              The Wild Oasis Resort
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-primary-50 font-medium leading-tight tracking-tight max-w-3xl">
              Unplug in a private cabin surrounded by mountain silence.
            </h1>
            <p className="mt-5 text-primary-200 text-base sm:text-lg max-w-2xl">
              Curated stays in the Italian Dolomites with panoramic views,
              handcrafted interiors, and effortless online booking.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cabins"
                className="bg-accent-500 px-6 py-3 text-primary-900 font-semibold hover:bg-accent-400 transition-colors"
              >
                Explore cabins
              </Link>
              <Link
                href="/about"
                className="border border-primary-600 bg-primary-900/70 px-6 py-3 text-primary-100 font-semibold hover:bg-primary-800 transition-colors"
              >
                Discover the experience
              </Link>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <article className="rounded-xl border border-primary-700/70 bg-primary-900/70 p-5 backdrop-blur">
              <p className="text-3xl font-semibold text-accent-400">12+</p>
              <p className="mt-1 text-sm text-primary-200">Luxury cabins</p>
            </article>
            <article className="rounded-xl border border-primary-700/70 bg-primary-900/70 p-5 backdrop-blur">
              <p className="text-3xl font-semibold text-accent-400">4.9/5</p>
              <p className="mt-1 text-sm text-primary-200">Guest satisfaction</p>
            </article>
            <article className="rounded-xl border border-primary-700/70 bg-primary-900/70 p-5 backdrop-blur">
              <p className="text-3xl font-semibold text-accent-400">24/7</p>
              <p className="mt-1 text-sm text-primary-200">Concierge support</p>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
