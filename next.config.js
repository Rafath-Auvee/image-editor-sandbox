/** @type {import('next').NextConfig} */
const nextConfig = {
  // fastRefresh: true,
  // concurrentFeatures: true,
  // productionBrowserSourceMaps: false, // Disable source maps in development
  // optimizeFonts: false, // Disable font optimization
  // minify: false, // Disable minification
  images: {
    domains: ["res.cloudinary.com", "i.ibb.co"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work

    return config;
  },
};

module.exports = nextConfig;
