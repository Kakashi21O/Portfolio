import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",

  basePath: isProd ? "/Portfolio" : "",
  assetPrefix: isProd ? "/Portfolio/" : "",

  allowedDevOrigins: ["192.168.56.1"],

  images: {
    unoptimized: true,
  },
};

export default nextConfig;