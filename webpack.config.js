"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: true
    })
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public")
  },
  devServer: {
    contentBase: "./public"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["awesome-typescript-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};
