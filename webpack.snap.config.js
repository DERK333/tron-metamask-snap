const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.snap.json'
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'commonjs',
    },
  },
  target: 'node',
  mode: 'production',
  optimization: {
    minimize: true,
  },
  externals: {
    // MetaMask snap APIs are provided by the runtime
    '@metamask/snaps-types': 'commonjs @metamask/snaps-types',
    '@metamask/snaps-ui': 'commonjs @metamask/snaps-ui',
    '@metamask/key-tree': 'commonjs @metamask/key-tree',
  },
  stats: {
    errorDetails: true,
  },
};