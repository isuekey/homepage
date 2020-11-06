
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry:{
    main:'./src/index.js',
    app:'./src/app.js',
  },
  plugins:[
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets:false
    }),
    new HtmlWebpackPlugin({
      title:'Caching',
      template:'./index.html',
    }),
/*    new WorkboxPlugin.GenerateSW({
      clientsClaim:true,
      skipWaiting:true,
    }),
*/
  ],
  output:{
    filename:'[name].[contenthash].js',
    // chunkFilename:'[name].[contenthash].mmmx',
    path: path.resolve(__dirname, 'dist'),
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
