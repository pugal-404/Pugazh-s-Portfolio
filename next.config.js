/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
    disableStaticImages: true,
  },
  webpack: (config, { isServer }) => {
    // Configuration for Three.js and related libraries
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];

    // Configuration for 3D model and texture files
    config.module.rules.push({
      test: /\.(glb|gltf|fbx)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]',
      },
    });

    // Add audio file handling to webpack configuration
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]',
      },
    });

    // Existing webpack configuration for CSS
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
  env: {
    NEXT_PUBLIC_FORMSPREE_ENDPOINT: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT,
  }
}

module.exports = nextConfig

