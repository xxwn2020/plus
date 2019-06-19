let mix = require('laravel-mix')
let path = require('path')
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
mix.setPublicPath(path.join('public', 'assets')).
  setResourceRoot('/assets/').
  webpackConfig({
    resolve: {
      extensions: ['.js', '.vue', '.json', 'scss'],
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
        : (`js/[name].${mix.inProduction() ? '[chunkhash].' : ''}js`),
      publicPath: mix.config.hmr ? '//localhost:8080/' : 'assets/'
    },
    devServer: {
      // contentBase: path.resolve(__dirname, 'public/assets/'),
      disableHostCheck: true
    }
  }).
  js('resources/js/bootstrap.js',
    path.join('public', 'assets', 'js', 'bootstrap.js')).
  js('resources/assets/admin/main.js',
    path.join('public', 'assets', 'js', 'admin.js'))
// sass('resources/sass/bootstrap.scss',
//   path.join('public', 'assets', 'css', 'bootstrap.css'))

if (mix.inProduction()) {
  mix.version()
} else {
  mix.sourceMaps(true)
}
