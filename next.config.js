/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname:"firebasestorage.googleapis.com",
        pathname:"/v0/b/ecommerceproject-416fd.appspot.com/o/"

      }
    ]
  }
}

module.exports = nextConfig
