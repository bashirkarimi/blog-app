/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@repo/ui", "@repo/modules", "@repo/content-types"],
};

export default nextConfig;
