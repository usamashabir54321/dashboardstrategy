/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },eslint: {
    ignoreDuringBuilds: true,
  },nextConfig: {
    reactStrictMode: true,
  },async rewrites() {
    return [ {
      source: '/:path*',
      destination: 'https://*',
    },]
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [{ key: "Access-Control-Allow-Origin", value: "*" },],
    },]
  },
}