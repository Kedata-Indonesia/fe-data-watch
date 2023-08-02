const withTranspileModules = require('next-transpile-modules')(['echarts', 'zrender']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-hotjar'],
};

module.exports = withTranspileModules(nextConfig);
