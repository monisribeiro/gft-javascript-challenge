module.exports = {
  mode: 'development',
  entry: [
    './src/index.js',
    './src/index.scss'
  ],
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  module: {
    rules: [
		{
		  test: /\.m?js$/,
		  exclude: /(node_modules|bower_components)/,
		  use: {
			loader: 'babel-loader',
			options: {
			  presets: ['@babel/preset-env']
			}
		  }
		},  
      {
        test: /\.scss$/,
        use: [
			{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
				loader: "sass-loader",
				options: {
				  modules: true,
				  importLoaders: 1,
				  localIdentName: "[name]_[local]_[hash:base64]",
				  sourceMap: true,
				  minimize: true
				}
			}
        ]
      }
    ]
  }
};