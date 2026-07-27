import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  
  // GitHub Pages project URL:
  // https://kakashi21o.github.io/Portfolio/
  basePath: "/Portfolio",
  assetPrefix: "/Portfolio/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
