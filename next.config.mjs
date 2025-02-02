/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/button',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
