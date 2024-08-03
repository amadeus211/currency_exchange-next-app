/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      API_HOST: process.env.API_HOST,
      API_KEY: process.env.API_KEY,

    },
  };
  
  export default nextConfig;
  