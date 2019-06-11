module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  outputDir: process.env.NODE_ENV !== 'production'
    ? '../../../public/assets/feed'
    : '../assets',
  runtimeCompiler: true,
  publicPath: '/feed/admin'
}
