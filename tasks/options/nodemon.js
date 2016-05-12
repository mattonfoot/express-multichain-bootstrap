module.exports = (config) => ({
  options: {
    callback: (nodemon) => nodemon.on('log', (event) => console.log(event.colour)),
    cwd: __dirname + '/../../',
    ignore: [],
    ext: 'js',
    watch: ['./dist'],
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
    script: './containers/express/dist/bin/www',
  },
});
