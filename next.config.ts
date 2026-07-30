import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  basePath: isProd ? "/Portfolio" : "",
  assetPrefix: isProd ? "/Portfolio/" : "",

  allowedDevOrigins: ["192.168.56.1"],

  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/Portfolio" : "",
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;