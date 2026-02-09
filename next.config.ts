import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Redirect /panel/* to /dashboard/* internally
      {
        source: '/panel',
        destination: '/dashboard',
      },
      {
        source: '/panel/:path*',
        destination: '/dashboard/:path*',
      },
    ];
  },
  async redirects() {
    return [
      // Redirect old /dashboard links to new /panel URLs
      {
        source: '/dashboard',
        destination: '/panel',
        permanent: true,
      },
      {
        source: '/dashboard/:path*',
        destination: '/panel/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
