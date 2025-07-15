const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.stats = {
        warnings: false,
      }
    }
    return config
  },
  output: 'standalone',
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
}

export default nextConfig