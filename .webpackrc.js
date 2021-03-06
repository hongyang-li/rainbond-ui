var path = require("path");

console.log(process.env.NODE_ENV);

export default {
  entry: "src/index.js",
  extraBabelPlugins: [
    [
      "import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
      },
    ],
  ],

  env: {
    development: {
      extraBabelPlugins: ["dva-hmr"],
      html: {
        template: "./src/index.ejs",
      },
      publicPath: "/", ///
    },
    production: {
      html: {
        filename: "../../templates/index.html", //
        template: "./src/index.ejs",
      },
      publicPath: "/static/dists/", //
      outputPath: path.resolve(__dirname, "../../pythonWork/rainbond-console/www/static/dists"),
    },
  },
  ignoreMomentLocale: true,
  theme: "./src/theme.js",

  disableDynamicImport: true,
  hash: true,
  proxy: {
    "/api": {
      target: "http://5000.gra4b2e5.goodrain.ali-hz.goodrain.net/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    },
  },
};
