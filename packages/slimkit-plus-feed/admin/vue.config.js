module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  publicPath: '/assets/feed/',
  outputDir: './dist',
  productionSourceMap: false,
  assetsDir: './',
  filenameHashing: false
}
