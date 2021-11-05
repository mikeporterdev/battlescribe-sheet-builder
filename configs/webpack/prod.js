// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  target: "https://www.betterscribe.app"
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: resolve(__dirname, "../../deploy"),
    publicPath: "/battlescribe-sheet-builder",
  },
  devtool: "source-map",
  plugins: [],
});
