"use server";

import { auth, signIn, signOut, unstable_update } from "@/app/_lib/auth";
import { executeGraphQL } from "./graphql";
import { uploadImageToCloudinary } from "./cloudinary";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be Logged in");

  const avatarFile = formData.get("avatar");
  let avatarUrl;
  if (avatarFile && avatarFile.size > 0) {
    avatarUrl = await uploadImageToCloudinary(avatarFile);
  }

  const nationalID = formData.get("nationalID")?.trim();
  const [nationality] = (formData.get("nationality") || "").split("%");

  if (nationalID && !/^[a-zA-Z0-9]{6,15}$/.test(nationalID)) {
    throw new Error("National ID must be 6-15 characters long");
  }

  const updateUserInput = {};
  if (nationalID) updateUserInput.nationalID = nationalID;
  if (nationality) updateUserInput.nationality = nationality;
  if (avatarUrl) updateUserInput.avatar = avatarUrl;

  if (Object.keys(updateUserInput).length === 0) {
    return;
  }

  const data = await executeGraphQL({
    query: `
      mutation UpdateMyProfile($updateUserInput: UpdateUserDto!) {
        updateMyProfile(updateUserInput: $updateUserInput) {
          id
          fullName
          email
          role
          avatar
          nationality
          nationalID
        }
      }
    `,
    variables: { updateUserInput },
    accessToken: session.accessToken,
  });

  const updatedUser = data.updateMyProfile;
  if (unstable_update) {
    await unstable_update({
      user: {
        ...session.user,
        id: updatedUser.id,
        name: updatedUser.fullName || session.user.name,
        email: updatedUser.email || session.user.email,
        image: updatedUser.avatar || session.user.image,
        role: updatedUser.role || session.user.role,
        nationality: updatedUser.nationality || "",
        nationalID: updatedUser.nationalID || "",
      },
    });
  }

  revalidatePath("/account/profile");
  revalidatePath("/account");

  // Return updated user data instead of redirecting
  return {
    success: true,
    user: {
      id: updatedUser.id,
      name: updatedUser.fullName || session.user.name,
      email: updatedUser.email || session.user.email,
      image: updatedUser.avatar || session.user.image,
      role: updatedUser.role || session.user.role,
      nationality: updatedUser.nationality || "",
      nationalID: updatedUser.nationalID || "",
    },
  };
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be Logged in");
  const guestId = Number(session.user?.id);
  if (!Number.isFinite(guestId)) {
    throw new Error("Unable to create booking: missing user ID in session");
  }
  const newBooking = {
    startDate: new Date(bookingData.startDate).toISOString(),
    endDate: new Date(bookingData.endDate).toISOString(),
    numNights: Number(bookingData.numNights),
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    isPaid: false,
    hasBreakfast: false,
    cabinId: Number(bookingData.cabinId),
    guestId,
  };
  await executeGraphQL({
    query: `
      mutation CreateBooking($bookingInput: BookingDto!) {
        createBooking(bookingInput: $bookingInput) {
          id
        }
      }
    `,
    variables: { bookingInput: newBooking },
    accessToken: session.accessToken,
  });
  revalidatePath(`cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be Logged in");
  const guestBookings = await getBookings(session.accessToken);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You cannot delete this reservation");
  await executeGraphQL({
    query: `
      mutation DeleteBooking($id: Float!) {
        deleteBooking(id: $id)
      }
    `,
    variables: { id: Number(bookingId) },
    accessToken: session.accessToken,
  });
  revalidatePath("/account/reservation");
}
export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));
  // 1) Authenticate the user
  const session = await auth();
  if (!session) throw new Error("You must be Logged in");
  // 2) Authorization
  const guestBookings = await getBookings(session.accessToken);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You cannot update this reservation");
  // 3) Build the update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  // 4) Mutation
  await executeGraphQL({
    query: `
      mutation UpdateBooking($id: Float!, $bookingUpdate: BookingUpdateDto!) {
        updateBooking(id: $id, bookingUpdate: $bookingUpdate) {
          id
        }
      }
    `,
    variables: { id: bookingId, bookingUpdate: updateData },
    accessToken: session.accessToken,
  });
  // 5) Error handling
  // 6) Revalidation
  revalidatePath("/account/reservation");
  revalidatePath(`/account/reservation/edit/${bookingId}`);
  // 7) Redirecting
  redirect("/account/reservation");
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signInWithEmailAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  let result;
  try {
    result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    return {
      error:
        error?.type === "CredentialsSignin"
          ? "Invalid email or password"
          : "Unable to sign in right now. Please try again.",
    };
  }

  if (result?.error) {
    return { error: "Invalid email or password" };
  }

  redirect("/account");
}

export async function signUpAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const fullName = formData.get("fullName");
  const nationality = formData.get("nationality")?.toString().trim() || "";
  const nationalID = formData.get("nationalID")?.toString().trim() || "";

  if (!email || !password || !fullName || !nationality) {
    return { error: "Please complete all required fields" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  try {
    await executeGraphQL({
      query: `
        mutation CreateUser($userInput: UserDto!) {
          createUser(userInput: $userInput) {
            id
            fullName
            email
            role
            createdAt
          }
        }
      `,
      variables: {
        userInput: {
          email,
          password,
          fullName,
          nationalID,
          nationality,
          avatar: "",
        },
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      redirect("/login?registered=1");
    }

    redirect("/account");
  } catch (error) {
    return { error: error.message || "Registration failed. Email may already be in use." };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
