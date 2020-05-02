const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pages = ["index"];
const htmlPlugins = pages.map(pageName => {
  return new HtmlWebpackPlugin({
    hash: true,
    title: pageName,
    template: "./public/index.html",
    chunks: [pageName, "vendor"],
    filename: pageName + ".html",
    excludeChunks: ["server"]
  });
});

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: ["*", ".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "src"),
      pages: path.resolve(__dirname, "src", "pages"),
      components: path.resolve(__dirname, "src", "components"),
      //optional firebase context folder
      utils: path.resolve(__dirname, "src", "utils")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    ...htmlPlugins
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env"] }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("autoprefixer")];
              }
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  }
};
