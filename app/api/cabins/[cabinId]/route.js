import { getCabin, getBookedDatesByCabinId } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = await params; // convert to number
  console.log("cabinId:", cabinId);

  try {
    const [cabin, bookedDate] = await Promise.all([
      getCabin(Number(cabinId)),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);
    return Response.json({ cabin, bookedDate });
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Cabin could not get loaded" },
      { status: 500 }
    );
  }
}
