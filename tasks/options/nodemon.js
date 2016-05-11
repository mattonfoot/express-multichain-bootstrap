module.exports = (config) => ({
  options: {
    callback: (nodemon) => nodemon.on('log', (event) => console.log(event.colour)),
    cwd: __dirname + '/../../',
    ignore: [
      'node_modules/**',
      'tasks',
      'test',
      'dist',
    ],
    ext: 'js',
    watch: ['./containers/expressnode/lib'],
    delay: 500,
    legacyWatch: true,
  },

  local: {
    options: {
      nodeArgs: ['--debug'],
      env: {
        PORT: config.env.PORT || '9001',
        HOST: config.env.HOST || '0.0.0.0',
      },
    },
    script: './containers/expressnode/lib/server.js',
  },
});
