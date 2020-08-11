
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  entry:{
    main:'./src/index.js',
    app:'./src/app.js',
  },
  devtool:'inline-source-map',
  devServer:{
    contentBase:'./dist',
  },
  plugins:[
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets:false
    }),
    new HtmlWebpackPlugin({
      title:'Caching',
      template:'./index.html',
    }),
  ],
  output:{
    filename:'[name].[contenthash].js',
    // chunkFilename:'[name].[contenthash].mmmx',
    path: path.resolve(__dirname, 'dist'),
    jsonpScriptType:'text/javascript',
  },
  optimization:{
    moduleIds:'hashed',
    splitChunks:{
      cacheGroups:{
        vendor:{
          test:/[\\/]node_modules[\\/]/,
          name:'vendors',
          chunks:'all'
        }
      }
    },
    runtimeChunk:'single',
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ],
      },{
        test:/\.(png|svg|jpg|gif)$/,
        use:[
          'file-loader'
        ],
      },{
        test:/\.(woff|woff2|eot|ttf|otf)$/,
        use:[
          'file-loader'
        ],
      },{
        test:/\.(csv|tsv)$/,
        use:[
          'csv-loader',
        ],
      },{
        test:/\.(xml)$/,
        use:[
          'xml-loader',
        ],
      },
    ],
  },
};
