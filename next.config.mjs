/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config){
        config.module.rules.push({
            test: /\.svg$/,
            use: [{loader: '@svgr/webpack', options: {icon:true}}],
        })
        return config;
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images:{
        remotePatterns:[
            {
                hostname:"img.clerk.com",
            },
        ],
    },
};

module.exports = nextConfig;