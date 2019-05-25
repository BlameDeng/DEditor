"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
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
        oneOf: [
          {
            test: /\.tsx?$/,
            use: ["awesome-typescript-loader"]
          },
          {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            use: ["file-loader"]
          }
        ]
      }
    ]
  }
};
