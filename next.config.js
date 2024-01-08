/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH_URL: process.env.AUTH_URL,
    QUIZ_URL: process.env.QUIZ_URL,
    CREATOR_URL: process.env.CREATOR_URL,
    JWT_LOCAL_STORAGE_KEY: process.env.JWT_LOCAL_STORAGE_KEY,
    EMAIL_LOCAL_STORAGE_KEY: process.env.EMAIL_LOCAL_STORAGE_KEY,
    OTP_LOCAL_STORAGE_KEY: process.env.OTP_LOCAL_STORAGE_KEY,
  }
}

module.exports = nextConfig
