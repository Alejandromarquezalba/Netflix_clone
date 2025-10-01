import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    // ⚠️ ¡Esto ignora los errores de ESLint durante el build!
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ También ignora errores de TypeScript si los hay
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
