/** @type {import('next').NextConfig} */
const nextConfig = {
 // reactStrictMode: true, // Ativa o reactStrictMode, que inclui Hot Reload

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3033',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
