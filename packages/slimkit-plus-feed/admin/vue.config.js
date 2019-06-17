module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  configureWebpack: {
    output: {
      filename: 'js/app.js'
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  publicPath:
    '/assets/feed/',
  outputDir:
  // process.env.NODE_ENV === 'production'
  //   //   ? './dist'
  //   //   :
    '../../../public/assets/feed/',
  productionSourceMap:
    false,
  assetsDir:
    './',
  filenameHashing:
    false,
  css:
    {
      extract: true
    }
}
