/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "vercel.app" },
      { protocol: "https", hostname: "*.vercel.app" },
    ],
  },
};

module.exports = nextConfig;
