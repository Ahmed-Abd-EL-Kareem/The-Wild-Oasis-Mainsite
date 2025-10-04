import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid bg-primary-800">
      <p className="text-center text-lg sm:text-xl py-8 sm:py-10 lg:py-12 self-center px-4">
        Please{" "}
        <Link href="/login" className="underline text-accent-500">
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
