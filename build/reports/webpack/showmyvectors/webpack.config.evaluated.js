{
  mode: 'development',
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'kotlin-source-map-loader'
        ],
        enforce: 'pre'
      }
    ]
  },
  entry: [
    '/Users/petem/dev/kotlin/showmyvectors/build/js/packages/showmyvectors/kotlin/showmyvectors.js'
  ],
  output: {
    path: '/Users/petem/dev/kotlin/showmyvectors/build/distributions',
    filename: 'showmyvectors.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    lazy: false,
    noInfo: true,
    open: true,
    overlay: false,
    port: 8080,
    contentBase: [
      '/Users/petem/dev/kotlin/showmyvectors/build/processedResources/Js/main'
    ]
  }
}