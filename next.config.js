/** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    BASE_URL: 'http://localhost:2000/api',
    DOMAIN_URL: 'http://localhost:2000',
    // BASE_URL: 'https://bluecats.onrender.com/api',
    // DOMAIN_URL: 'https://bluecats.onrender.com',
    ARTICLE: 'article',
    DRAFT: 'draft',
    LOGIN: 'auth/login',
    SIGNUP: 'auth/signup',
    USER: 'user',
    SEGMENT: 'segment',
  }
}

module.exports = nextConfig