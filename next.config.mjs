/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["lh3.googleusercontent.com"], // Add this line
    remotePatterns: [
      new URL(
        "https://aurbgdomasevbusqekah.supabase.co/storage/v1/object/public/cabin-images/**"
      ),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://res.cloudinary.com/**"),
      new URL("https://pin.it/**"),
    ],
    qualities: [80, 100],
  },
  // output: "export",
};
export default nextConfig;
