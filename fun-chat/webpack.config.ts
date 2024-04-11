import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

const baseConfig: webpack.Configuration = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"),
          to: path.resolve(__dirname, "dist", "assets"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      { test: /\.ts$/i, use: "ts-loader" },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      Components: path.resolve(__dirname, "src/app/components/"),
      Data: path.resolve(__dirname, "src/app/data/"),
      Enums: path.resolve(__dirname, "src/app/enums/"),
      Interfaces: path.resolve(__dirname, "src/app/interfaces/"),
      Pages: path.resolve(__dirname, "src/app/pages/"),
      Router: path.resolve(__dirname, "src/app/router/"),
      Services: path.resolve(__dirname, "src/app/services/"),
      Utils: path.resolve(__dirname, "src/app/utils/"),
      Assets: path.resolve(__dirname, "src/assets/"),
    },
  },
};

type Mode = "prod" | "dev";
interface EvnVariables {
  mode: Mode;
}

module.exports = (env: EvnVariables) => {
  const isProductionMode = env.mode === "prod";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");
  return merge(baseConfig, envConfig);
};
