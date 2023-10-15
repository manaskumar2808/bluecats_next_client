/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    // BASE_URL: 'http://localhost:2000/api',
    BASE_URL: 'https://bluecats.onrender.com/api',
    ARTICLE: 'article',
    DRAFT: 'draft',
    LOGIN: 'auth/login',
    SIGNUP: 'auth/signup',
    USER: 'user',
  }
}

module.exports = nextConfig