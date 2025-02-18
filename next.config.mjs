/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rgqlfhkkxritdeajtgrw.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
  // output: "export"
};

export default nextConfig;
