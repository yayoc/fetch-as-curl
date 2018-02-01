const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "index.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },
  plugins: [new UglifyJsPlugin()]
};
