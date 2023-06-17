/** @typedef {import("next").NextConfig} NextConfig */

/** @type {(config?: NextConfig) => NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" && {
      exclude: ["error"],
    },
  },
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.resolve.alias["@mui/material"] = "@mui/joy";
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
      preventFullImport: true,
    },
  },
  headers: () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
      ],
    },
  ],
};

module.exports = withBundleAnalyzer(nextConfig);
