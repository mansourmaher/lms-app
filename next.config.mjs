/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        domains:[ "utfs.io",'avatars.githubusercontent.com']
    },
    experimental: {
        serverActions: {
          allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
        },
      },
}

export default nextConfig