import Image from "next/image";
import { signInAction } from "@/app/_lib/actions";
function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="cursor-pointer flex items-center gap-4 sm:gap-6 text-base sm:text-lg border border-primary-300 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 font-medium hover:bg-primary-800 transition-colors">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="20"
          width="20"
          className="h-5 w-5 sm:h-6 sm:w-6"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
