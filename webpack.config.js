const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./client/index.jsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    })
  ],
  devServer: {
    historyApiFallback: true,
    open: !process.env.NODE_ENV === "production",
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  devtool:
    process.env.NODE_ENV === "production"
      ? "source-map"
      : "cheap-module-eval-source-map"
};
