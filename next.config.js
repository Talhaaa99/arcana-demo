/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "gateway-dev.arcana.network",
        port: "",
        pathname: "/api/v2/app/**",
      },
    ],
  },
};

module.exports = nextConfig;
