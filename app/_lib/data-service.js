import { executeGraphQL } from "./graphql";
import { notFound } from "next/navigation";
/////////////
// GET

export async function getCabin(id) {
  try {
    const data = await executeGraphQL({
      query: `
        query GetCabinById($id: Float!) {
          getCabinById(id: $id) {
            id
            name
            maxCapacity
            regularPrice
            discount
            description
            image
          }
        }
      `,
      variables: { id: Number(id) },
    });
    return data.getCabinById;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getCabinPrice(id) {
  const cabin = await getCabin(id);
  return { regularPrice: cabin.regularPrice, discount: cabin.discount };
}

export const getCabins = async function () {
  const data = await executeGraphQL({
    query: `
      query GetAllCabins($sort: CabinSortArgs, $pagination: PaginationArgs) {
        getAllCabins(sort: $sort, pagination: $pagination) {
          data {
            id
            name
            maxCapacity
            regularPrice
            discount
            description
            image
            createdAt
          }
          total
          page
          limit
          totalPages
        }
      }
    `,
    variables: {
      sort: { field: "PRICE", order: "ASC" },
      pagination: { page: 1, limit: 100 },
    },
  });

  const payload = data.getAllCabins;
  if (Array.isArray(payload)) return payload;
  return payload?.data || [];
};

// Guests are uniquely identified by their email address
export async function getGuest(email, accessToken) {
  const data = await executeGraphQL({
    query: `
      query FindOneByEmail($email: String!) {
        findOneByEmail(email: $email) {
          id
          fullName
          email
          role
          avatar
          nationalID
          nationality
          createdAt
        }
      }
    `,
    variables: { email },
    accessToken,
  });
  return data.findOneByEmail;
}

export async function getBooking(id, accessToken) {
  const bookings = await getBookings(accessToken);
  const booking = bookings.find((item) => item.id === Number(id));
  if (!booking) throw new Error("Booking could not get loaded");
  return booking;
}

export async function getBookings(accessToken) {
  const data = await executeGraphQL({
    query: `
      query GetMyBookings($sort: BookingSortArgs, $pagination: PaginationArgs) {
        getMyBookings(sort: $sort, pagination: $pagination) {
          data {
            id
            startDate
            endDate
            numNights
            numGuests
            totalPrice
            status
            observations
            createdAt
            cabin {
              id
              name
              image
            }
          }
          total
          page
          limit
          totalPages
        }
      }
    `,
    variables: {
      sort: { field: "START_DATE", order: "DESC" },
      pagination: { page: 1, limit: 100 },
    },
    accessToken,
  });

  const payload = data.getMyBookings;
  if (Array.isArray(payload)) return payload;
  return payload?.data || [];
}

export async function getBookedDatesByCabinId(cabinId) {
  // The public API currently doesn't expose cabin-specific unavailable dates.
  // Return an empty list so booking UI keeps working until backend query is added.
  return [];
}

export async function getSettings(accessToken) {
  const query = `
    query GetSettings {
      getSettings {
        id
        minBookingLength
        maxBookingLength
        maxGuestsPerBooking
        breakfastPrice
        updatedAt
      }
    }
  `;

  try {
    const data = await executeGraphQL({
      query,
      accessToken,
    });
    return data.getSettings;
  } catch (error) {
    if (!accessToken || !String(error?.message).includes("Unauthorized")) {
      throw error;
    }

    // Fallback in case backend marks settings as public on some environments.
    const data = await executeGraphQL({ query });
    return data.getSettings;
  }
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag,alpha2Code"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

