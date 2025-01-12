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

  // Enable Turbopack
  experimental: {
    turbo: true, // Enable Turbopack bundler
  },

  // Webpack configuration (if still using Webpack for some cases)
  webpack: (config) => {
    // Add custom rules to handle JSON files or other cases
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });

    // Prevent build failures due to errors in production
    config.plugins.push(
      new (require('webpack').NoEmitOnErrorsPlugin)() // This plugin ensures build continues even on errors
    );

    return config;
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

  // Webpack Dev Middleware config (adjusted for Turbopack)
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      aggregateTimeout: 300,
      poll: 1000,
    };
    return config;
  },
};

module.exports = nextConfig;
