/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // MDX is loaded at runtime via next-mdx-remote (see lib/mdx.ts),
  // so no @next/mdx webpack config is required here.
};

export default nextConfig;
