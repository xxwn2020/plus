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
mix.setPublicPath(path.join('public', 'assets'))
    .setResourceRoot('assets/')
    .webpackConfig({
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                "@": path.resolve(
                    __dirname,
                    "resources/assets/admin"
                )
            }
        },
        output: {
            // 依据该路径进行编译以及异步加载
            publicPath: 'assets/',
            // 注意开发期间不加 hash，以免自动刷新失败
            chunkFilename: `js/chunk-[name].${mix.inProduction() ? '-[chunkhash].' : ''}js`
        },
    });
/*
 |--------------------------------------------------------------------------
 | 后台可运行 js 捆
 |--------------------------------------------------------------------------
 |
 | 不包含 jQuery 和 Bootstrap 的 vue 捆包。
 |
 */

mix.js('resources/assets/admin/main.js', path.join('public', 'assets', 'js', 'admin.js'));

if (mix.inProduction()) {
    mix.version()
} else {
    mix.disableNotifications()
        .sourceMaps(true)
}
