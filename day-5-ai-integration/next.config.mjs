/** @type {import('next').NextConfig} */
const campusApiUrl =
  process.env.CAMPUS_API_URL || "http://127.0.0.1:3004";

const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${campusApiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
