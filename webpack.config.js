module.exports = {
  entry: './src/app.js',
  output: {
    filename: '../app/dist/bundle.js',
    path: __dirname,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  }
}