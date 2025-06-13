const { configDotenv } = require('dotenv');
const {DefinePlugin} = require('webpack');
const swcDefaultConfig = require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory().swcOptions;

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  plugins: [
    new DefinePlugin({
      MODE: `'${process.env.NODE_ENV}'`
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: swcDefaultConfig
        },
      },
    ],
  },
};

module.exports = config;