const path = require('path');

module.exports = {
  entry: {
    profile: './src/profile/index.js', //точка входа
    dashboard: './src/dashboard/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'build'),
  },
  watch: true,
};
