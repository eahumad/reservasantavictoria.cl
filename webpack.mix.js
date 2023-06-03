let mix = require('laravel-mix')

mix.setPublicPath('public_html/')

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
  .js('src/js/app.js', 'public_html/assets')
  .sass('src/scss/app.scss', 'public_html/assets')
  .copy('src/img/*.jpg', 'public_html/images/')
  .copy('src/img/*.png', 'public_html/images/')
  .copy('src/img/galeria/*.jpg', 'public_html/images/galeria')
  .copy('src/img/favicon.png', 'public_html/')
  .copy('src/php/*.php', 'public_html/functions/')
  .copy('src/templates/*.html', 'public_html/templates/')

mix.version()
  .sourceMaps()


const HtmlWebpackPlugin = require('html-webpack-plugin')

mix.webpackConfig({
  output: {
    publicPath: "",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      output: 'public_html',
      inject: 'body',
      hash: true
    })
  ]
});

