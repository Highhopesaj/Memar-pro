/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'liara.run'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'MEMAR PRO',
    NEXT_PUBLIC_APP_URL: process.env.NEXTAUTH_URL || 'https://memar-pro.liara.run',
  },
};

module.exports = nextConfig;
