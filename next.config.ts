import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  distDir: "./.next",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  output: "standalone",
};

export default nextConfig;
