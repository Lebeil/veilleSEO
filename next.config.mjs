/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Appliquer à toutes les routes
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Vous pouvez modifier cette valeur si besoin
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
