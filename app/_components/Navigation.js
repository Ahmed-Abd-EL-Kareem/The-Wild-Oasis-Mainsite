import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  // console.log(session);
  return (
    <nav className="z-10 text-lg sm:text-xl">
      <ul className="flex gap-4 sm:gap-8 lg:gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-2 sm:gap-4"
            >
              <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                <Image
                  src={session.user.image}
                  className="h-6 sm:h-8 rounded-full"
                  fill
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="hidden sm:inline">Guest area</span>
              <span className="sm:hidden">Account</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
