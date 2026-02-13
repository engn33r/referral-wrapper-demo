/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'build',
  reactStrictMode: true,
  turbopack: {},
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "token-assets-one.vercel.app",
        pathname: "/api/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback };
    config.externals.push(
      "@coinbase/wallet-sdk",
      "@metamask/sdk",
      "@safe-global/safe-apps-sdk",
      "@safe-global/safe-apps-provider",
      "@base-org/account",
      "@gemini-wallet/core",
      "@walletconnect/ethereum-provider",
      "@walletconnect/modal",
    );
    return config;
  },
};

module.exports = nextConfig;
