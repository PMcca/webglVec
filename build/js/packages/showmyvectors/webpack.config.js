var config = {
  mode: 'development',
  resolve: {
    modules: [
      "node_modules"
    ]
  },
  plugins: [],
  module: {
    rules: []
  }
};

// entry
if (!config.entry) config.entry = [];
config.entry.push("/Users/petem/dev/kotlin/showmyvectors/build/js/packages/showmyvectors/kotlin/showmyvectors.js");
config.output = {
    path: "/Users/petem/dev/kotlin/showmyvectors/build/distributions",
    filename: "showmyvectors.js"
};

// source maps
config.module.rules.push({
        test: /\.js$/,
        use: ["kotlin-source-map-loader"],
        enforce: "pre"
});
config.devtool = 'eval-source-map';

// dev server
config.devServer = {
  "inline": true,
  "lazy": false,
  "noInfo": true,
  "open": true,
  "overlay": false,
  "port": 8080,
  "contentBase": [
    "/Users/petem/dev/kotlin/showmyvectors/build/processedResources/Js/main"
  ]
};

// save evaluated config file
var util = require('util');
var fs = require("fs");
var evaluatedConfig = util.inspect(config, {showHidden: false, depth: null, compact: false});
fs.writeFile("/Users/petem/dev/kotlin/showmyvectors/build/reports/webpack/showmyvectors/webpack.config.evaluated.js", evaluatedConfig, function (err) {});

module.exports = config
