import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
  context: path.resolve(__dirname, "src"),
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  entry: {
    // app: "./index.js",
    // app: "./index.jsx",
    app: "./index.tsx",
    vendorStyles: "../node_modules/bootstrap/dist/css/bootstrap.css",
  },
  output: {
    filename: "[name].[chunkhash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        // test: /\.js$/,
        // test: /\.jsx$/,
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/, Since we want to include the bootstrap css
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                exportLocalsConvention: "camelCase",
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
      {
        test: /\.html/,
        use: "html-loader",
      },
    ],
  },
  devtool: "eval-source-map",
  devMiddleware: {
    stats: "errors-only",
  },
  devServer: {
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      scriptLoading: "blocking",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
    }),
  ],
};
