/* eslint-disable */

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": true
          }
        }
      ],
      '@babel/preset-react',
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };
};
