/** @type {import('next').NextConfig} */
require('dotenv').config({ path: __dirname + '/src/.env' })

const nextConfig = {
  reactStrictMode: false,
  env: {
    AUTH_URL: process.env.AUTH_URL,
    QUIZ_URL: process.env.QUIZ_URL,
    CREATOR_URL: process.env.CREATOR_URL,
    ADMIN_URL: process.env.ADMIN_URL,
    JWT_LOCAL_STORAGE_KEY: process.env.JWT_LOCAL_STORAGE_KEY,
    EMAIL_LOCAL_STORAGE_KEY: process.env.EMAIL_LOCAL_STORAGE_KEY,
    OTP_LOCAL_STORAGE_KEY: process.env.OTP_LOCAL_STORAGE_KEY,
  },
  async header() {
    return [
      {
        source: '/*',
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ];
  }
}

module.exports = nextConfig
