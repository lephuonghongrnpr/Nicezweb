import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.pic.in.th",
      },
      {
        protocol: "https",
        hostname: "pic.in.th",
      },
    ],
  },
};

export default nextConfig;
