const path = require('path');

module.exports = {
  entry: './client/src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  output: {
    filename: 'client-bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  target: 'web',
  mode: 'production',
  optimization: {
    minimize: true,
  },
  stats: {
    errorDetails: true,
  },
};