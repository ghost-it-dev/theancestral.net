/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		esmExternals: 'loose'
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '**',
			},
		],
	},
}

module.exports = nextConfig
