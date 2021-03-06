module.exports = {
  publicPath: './',
  productionSourceMap: false,
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      exclude: [
        /\.json$/
      ]
    },
    manifestPath: './public/manifest.json',
    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null
    }
  }
}