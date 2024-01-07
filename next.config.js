/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH_URL: process.env.AUTH_URL,
  }
}

module.exports = nextConfig
