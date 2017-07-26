const path = require('path');

module.exports = {
   entry: "./www/app/app.js",
   output: {
      path: path.resolve(__dirname, "www/dist"),
      filename: "bundle.js"
     // publicPath: "public", //使用webpack-server
   },
   module: {
      rules: [{
         test: /\.js$/,
         exclude: [
            path.resolve(__dirname, "node_modules")
         ],
         loader: "babel-loader",
         options: {
            presets: ["es2015","stage-3"],
            plugins:[
                [
                    "transform-runtime",
                    {
                        "helpers": false,
                        "polyfill": false,
                        "regenerator": true,
                        "moduleName": "babel-runtime"
                    }
                ]
                ,
                "transform-object-rest-spread"
            ]
         }
      }, {
         test: /\.vue$/,
         loader: 'vue-loader',
         options: {
            loaders: {
               stylus: 'vue-style-loader!css-loader!stylus-loader'
            }
         }
      },{
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },{
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },{
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }]
   },
   resolve: {
      alias: {
         'vue': 'vue/dist/vue.js'
      }
   },
   watch : true
}
