import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="cursor-pointer py-2 lg:py-3 px-3 lg:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 lg:gap-4 font-semibold text-primary-200 w-full text-base lg:text-lg">
        <ArrowRightOnRectangleIcon className="h-4 w-4 lg:h-5 lg:w-5 text-primary-600 flex-shrink-0" />
        <span className="hidden sm:inline lg:inline">Sign out</span>
        <span className="sm:hidden lg:hidden">Out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
