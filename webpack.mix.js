let mix = require('laravel-mix')

mix.setPublicPath('dist/')

mix
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
  .sass('src/scss/app.scss', 'dist/assets')
  .copy('src/img/*.jpg','dist/images/')

mix.version()
.sourceMaps()


const HtmlWebpackPlugin = require('html-webpack-plugin')

mix.webpackConfig({
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      output: 'dist'
    })
  ]
});

