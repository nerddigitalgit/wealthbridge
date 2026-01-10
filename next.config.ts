import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.builder.io'],
  },
}

export default nextConfig
