import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configuring image domains and remote patterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ai.barkprotocol.net',
      },
    ],
  },

  // Enable Turbopack (configure if needed)
  experimental: {
    turbo: true, // Enable Turbopack bundler for development
  },

  // ESLint configuration
  eslint: {
    // Allow production builds to succeed even if there are ESLint errors
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },

  // Development server configuration
  devIndicators: {
    buildActivity: false, // Disable build activity indicators
  },
};

export default nextConfig;
