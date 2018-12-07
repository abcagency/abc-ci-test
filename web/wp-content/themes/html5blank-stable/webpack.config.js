const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
//const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
require("babel-polyfill");

const autoprefixer = require("autoprefixer");

module.exports = {
  entry: ["babel-polyfill", "./js/main.js", "./scss/main.scss"],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map", // any "source-map"-like devtool is possible
  module: {
    rules: [
      /*
      your other rules for JavaScript transpiling go in here
      */
      {
        test: /.*\.(gif|png|jpe?g)$/,
        use: "file-loader?limit=20000"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        // regular css files
        test: /\.css$/,
        exclude: /(dist)/,
        use: ExtractTextPlugin.extract({
          use:
            "css-loader?importLoaders=1&sourceMap=true&minimize=true!postcss-loader"
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader?minimize=false&sourceMap=true",
            "postcss-loader?&sourceMap=true",
            "sass-loader?sourceMap=true"
          ]
        })
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      },
      {
        test: /\.(svg)$/,
        loader: "file-loader?name=svg/[name].[ext]"
      }
    ]
  },
  resolve: {
    alias: {
      Waypoint: "waypoints/lib"
    }
  },
  plugins: [
    // new HardSourceWebpackPlugin(),
    new ExtractTextPlugin({
      // define where to save the file
      filename: "[name].bundle.css",
      allChunks: true
    }),
    // new UglifyJSPlugin({ sourceMap: false }),
    new webpack.optimize.ModuleConcatenationPlugin()
    // new DashboardPlugin(),
  ]
};
