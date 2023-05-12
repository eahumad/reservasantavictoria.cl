let mix = require('laravel-mix')

mix.setPublicPath('dist')
  .options({
    html: {
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }
  })
  .js('src/js/app.js', 'dist/assets')
  .sass('src/scss/app.scss', 'dist/assets').sourceMaps()
  .version();


  const HtmlWebpackPlugin = require('html-webpack-plugin');

  mix.webpackConfig({
    plugins: [
       new HtmlWebpackPlugin({
          template: 'src/index.html',
          filename: 'index.html'
       })
    ]
 });

