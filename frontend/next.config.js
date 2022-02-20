/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["assets.poap.xyz", "www.poap.xyz", "https:/s3.us-east-2.amazonaws.com"],
  },
};

module.exports = nextConfig
