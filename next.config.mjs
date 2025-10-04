/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["lh3.googleusercontent.com"], // Add this line
    remotePatterns: [
      new URL(
        "https://aurbgdomasevbusqekah.supabase.co/storage/v1/object/public/cabin-images/**"
      ),
      new URL("https://lh3.googleusercontent.com/**"),
    ],
    qualities: [80, 100],
  },
  // output: "export",
};
export default nextConfig;
