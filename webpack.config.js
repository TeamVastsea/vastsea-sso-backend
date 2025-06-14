const {DefinePlugin} = require('webpack');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  plugins: [
    new DefinePlugin({
      MODE: `'${process.env.NODE_ENV}'`
    })
  ],
};

module.exports = config;