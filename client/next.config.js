/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'fr',
  },
  transpilePackages: ['@local/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'nwvyqxshflljbdcvvcey.supabase.co',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    };
    return config;
  },
};
