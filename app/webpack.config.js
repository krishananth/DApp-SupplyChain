const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/js/app.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "./src/index.html", to: "index.html" }, 
      { from: "./src/*.css",    to: '[name].css'},
      { from: "../build/contracts/*.json",    to: '[name].json'}
    ]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
