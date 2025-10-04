import { ReservationProvider } from "@/app/_components/ReservationContext";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });
export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome to The Wild Oasis",
  },
  description:
    "Luxurious cabins hotels, located in the heart of Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
