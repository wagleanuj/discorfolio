/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.jsdelivr.net'], // Allow loading images from jsdelivr
  },
  // Disable type checking during builds for better performance
  typescript: {
    // ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
