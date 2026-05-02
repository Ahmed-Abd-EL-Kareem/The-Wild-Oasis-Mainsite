import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

export default async function Navigation() {
  const session = await auth();
  const avatarUrl = session?.user?.image || "";
  const canRenderAvatarWithNextImage =
    avatarUrl &&
    /^https?:\/\//i.test(avatarUrl) &&
    !avatarUrl.includes("pin.it/");
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
          {avatarUrl ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-2 sm:gap-4"
            >
              <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                {canRenderAvatarWithNextImage ? (
                  <Image
                    src={avatarUrl}
                    className="h-6 sm:h-8 rounded-full object-cover"
                    fill
                    alt={session.user.name}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary-700 text-primary-100 grid place-items-center text-xs font-semibold">
                    {(session?.user?.name || "G").slice(0, 1).toUpperCase()}
                  </div>
                )}
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
