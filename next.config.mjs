/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "standalone",
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apex-app-dev.s3.eu-west-3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
