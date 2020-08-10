
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
      title:'Output Management',
      template:'./index.html',
    }),
  ],
  output:{
    filename:'[name].[hash].mmx',
    chunkFilename:'[name].[hash].mmmx',
    path: path.resolve(__dirname, 'dist'),
    jsonpScriptType:'text/javascript',
  },
  optimization:{
    splitChunks:{
      chunks:'all',
    },
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
