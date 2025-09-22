/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ❌ skip ESLint on build
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ewssqnuospcupuzezvuk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
