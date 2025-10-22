// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // Você pode adicionar 'port' e 'pathname' se precisar ser mais específico,
        // mas geralmente apenas o hostname é suficiente.
      },
      // Adicione outros hostnames aqui se precisar no futuro
    ],
  },
};

export default nextConfig;