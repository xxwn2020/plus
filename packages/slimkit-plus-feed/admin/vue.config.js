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
  outputDir: process.env.NODE_ENV === 'production'
    ? './dist'
    : '../../../public/assets/feed/',
  productionSourceMap: false,
  assetsDir: './',
  filenameHashing: false
}
