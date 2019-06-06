let mix = require('laravel-mix')
let path = require('path')

mix.setPublicPath(path.join('public', 'assets')).
  setResourceRoot(mix.config.hmr ? '' : 'assets/').
  webpackConfig({
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(
          __dirname,
          'resources/assets/admin'
        )
      }
    },
    output: {
      chunkFilename: mix.config.hmr
        ? `[name].js`
        : (`js/chunk-[name].${mix.inProduction() ? '-[chunkhash].' : ''}js`),
      publicPath: mix.config.hmr ? '//localhost:8080/' : 'assets/'
    },
    devServer: {
      // contentBase: path.resolve(__dirname, 'public/assets/'),
      disableHostCheck: true
    }
  })

if (!mix.config.hmr) {
  mix.browserSync({
    ui: false,
    injectChanges: true,
    notify: false,
    startPath: '/admin',
    proxy: 'plus.test',
    logLevel: 'silent',
    files: [
      'public/assets/*.*'
    ]
  })
}

mix.js('resources/assets/admin/main.js',
  path.join('public', 'assets', 'js', 'admin.js'))

if (mix.inProduction()) {
  mix.version()
} else {
  mix.disableNotifications().sourceMaps(true)
}
