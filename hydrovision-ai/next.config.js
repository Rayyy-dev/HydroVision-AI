/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['localhost'],
    },
    framework: 'nextjs',
    poweredByHeader: false,
}

module.exports = nextConfig 