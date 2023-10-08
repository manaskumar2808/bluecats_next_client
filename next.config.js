/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    BASE_URL: 'http://localhost:2000/api',
    ARTICLE: 'article',
    LOGIN: 'auth/login',
    SIGNUP: 'auth/signup',
    USER: 'user',
  }
}

module.exports = nextConfig