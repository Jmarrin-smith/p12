/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow any hostname
      },
    ], 
      domains: ["img.clerk.com"],

  },
};

export default nextConfig;
