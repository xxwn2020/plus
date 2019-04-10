let mix = require('laravel-mix');
let path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      "@": path.resolve(
        __dirname,
        "resources/assets/admin"
      )
    }
  },
  // output: {
  //   filename: '[name].js',
  //   chunkFilename: 'assets/js/[name].app.js'
  // }
  output: {
    // 依据该路径进行编译以及异步加载
    publicPath: 'assets/js/',
    // 注意开发期间不加 hash，以免自动刷新失败
    chunkFilename: `chunk[name].${ mix.inProduction() ? '[chunkhash].' : '' }js`
  },
});

/*
 |--------------------------------------------------------------------------
 | Bootstrap SASS & jQuery bundle.
 |--------------------------------------------------------------------------
 |
 | 包含 jQuery 和 Bootstrap 的捆包。
 |
 */

// mix.sass('resources/sass/bootstrap.scss', path.join('public', 'assets', 'css'))
//    .js('resources/js/bootstrap.js', path.join('public', 'assets', 'js'))


/*
 |--------------------------------------------------------------------------
 | 后台可运行 js 捆
 |--------------------------------------------------------------------------
 |
 | 不包含 jQuery 和 Bootstrap 的 vue 捆包。
 |
 */

mix.setPublicPath(path.join('public'))
    .setResourceRoot('/assets/')
    .options({
      processCssUrls: false
    })
    .js('resources/assets/admin/main.js', path.join('public', 'assets', 'js', 'admin.js'))
    .autoload({
      vue: ['Vue']
    });

if (mix.inProduction()) {
  mix.version()
} else {
  mix.disableNotifications()
      .sourceMaps(true)
}
