import env from './utils/env.mjs'
const imageDomains = env.IMAGE_DOMAINS.replaceAll(' ', '').split(',')

console.log(env.IMAGE_DOMAINS, imageDomains)
const nextjsConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: env.S3_BUCKET_DOMAIN,
        port: '',
        pathname: '/**',
      },
    ], 
    domains: imageDomains
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/index",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true, 
  },
};

export default nextjsConfig
