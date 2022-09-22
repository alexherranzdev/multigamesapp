const withOptimizedImages = require('next-optimized-images')

module.exports = withOptimizedImages({
  /* config for next-optimized-images */
  // your config for other plugins or the general next.js here...
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   outputStandalone: true
  // },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      }
    }

    return config
  }
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/quiz': { page: '/quiz' }
  //   }
  // }
}

module.exports = nextConfig
