"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "@/app/_components/SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservation",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:top-auto border-r-0 lg:border-r border-primary-900 border-t lg:border-t-0 lg:border-b-0 bg-primary-950 lg:bg-transparent z-50 lg:z-auto">
      <ul className="flex flex-row lg:flex-col gap-1 lg:gap-2 text-base lg:text-lg overflow-x-auto lg:overflow-x-visible justify-center lg:justify-start py-2 lg:py-0 lg:h-full">
        {navLinks.map((link) => (
          <li key={link.name} className="flex-shrink-0">
            <Link
              className={`py-2 lg:py-3 px-3 lg:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 lg:gap-4 font-semibold text-primary-200 whitespace-nowrap ${
                pathname === link.href ? "bg-primary-900 " : ""
              }`}
              href={link.href}
            >
              <span className="flex-shrink-0">{link.icon}</span>
              <span className="hidden sm:inline lg:inline">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-0 lg:mt-auto flex-shrink-0">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
