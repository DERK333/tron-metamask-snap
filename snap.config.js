module.exports = {
  input: './src/index.ts',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  server: {
    port: 8080
  },
  stats: {
    builtIns: false
  }
};