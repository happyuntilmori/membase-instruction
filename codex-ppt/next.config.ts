import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/membase-instruction/codex-ppt",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
