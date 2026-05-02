import { auth } from "@/app/_lib/auth";
import AccountClient from "./AccountClient";

export const metadata = {
  title: "Guest Area",
};

export default async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(" ")[0];

  return <AccountClient firstName={firstName} />;
}
