const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/vocab-trainer/' : '',
  basePath: isProd ? '/vocab-trainer' : '',
  trailingSlash: true,
};

export default nextConfig;
