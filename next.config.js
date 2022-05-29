/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: true },
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  build: {
    env: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    },
  },
  env: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
}

module.exports = nextConfig
