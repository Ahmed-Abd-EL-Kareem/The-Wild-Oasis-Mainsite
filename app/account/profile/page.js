import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const guest = {
    fullName: session.user.name,
    email: session.user.email,
    nationality: session.user.nationality,
    nationalID: session.user.nationalID,
    avatar: session.user.image,
  };

  return (
    <ProfileClient>
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </ProfileClient>
  );
}
