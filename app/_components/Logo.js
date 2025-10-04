import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-4 z-10">
      <Image
        src={logo}
        height="40"
        width="40"
        className="h-8 w-8 sm:h-10 sm:w-10"
        quality={100}
        alt="The Wild Oasis logo"
      />
      <span className="text-lg sm:text-xl font-semibold text-primary-100">
        <span className="hidden sm:inline">The Wild Oasis</span>
        <span className="sm:hidden">Wild Oasis</span>
      </span>
    </Link>
  );
}

export default Logo;
