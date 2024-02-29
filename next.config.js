const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  reactStrictMode: true,
}

module.exports = withNextIntl(nextConfig)
