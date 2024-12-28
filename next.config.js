/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  // Remove or comment out the webpack config if you're not using CSS modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      };
    }
    return config;
  },
  // Add this to ensure proper static export
  trailingSlash: true,
  // Ensure we're not trying to use API routes in static export
  skipMiddlewareUrlNormalize: true,
}

module.exports = nextConfig