/** @type {import('next').NextConfig} */
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const imageDomains = ['localhost'];
if (STRAPI_URL) {
  try {
    const { hostname } = new URL(STRAPI_URL);
    if (hostname && !imageDomains.includes(hostname)) imageDomains.push(hostname);
  } catch {}
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: imageDomains,
  },
};

module.exports = nextConfig
