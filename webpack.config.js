import { resolve as _resolve, dirname } from "path";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";

const __dirname = dirname(new URL(import.meta.url).pathname);
const isProduction = process.env.NODE_ENV == "production";

/** @type { import('webpack').Configuration } */
const config = {
  entry: {
    package: "./src/package/index.ts",
    "install-script": "./src/install-script/index.ts",
    "spm-wrapper": "./src/spm-wrapper/index.ts",
  },
  output: {
    path: _resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    library: {
      name: "Spm",
      type: "umd",
      export: "default",
    },
    globalObject: "this",
  },
  plugins: [
    new ESLintWebpackPlugin({ extensions: ["ts"] }),
    new webpack.BannerPlugin({
      banner:
        "// Variables used by Scriptable.\n// These must be at the very top of the file. Do not edit.\n// icon-color: deep-gray; icon-glyph: download;",
      raw: true,
      include: "install-script.bundle.js",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./dist/package.bundle.js",
          to: "/Users/dominikbernroider/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/spm/spm-team>spm>0.0.1.js",
        },
        {
          from: "./dist/install-script.bundle.js",
          to: "/Users/dominikbernroider/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/install-spm.js",
        },
        {
          from: "./dist/spm-wrapper.bundle.js",
          to: "/Users/dominikbernroider/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents/spm/spm-wrapper.js",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  optimization: {},
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
