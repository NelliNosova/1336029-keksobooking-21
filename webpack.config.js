const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/messages.js",
    "./js/backend.js",
    "./js/form.js",
    "./js/card.js",
    "./js/main.js",
    "./js/filter.js",
    "./js/pin.js",
    "./js/moving.js",
    "./js/preview.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
