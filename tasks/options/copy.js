module.exports = config => ({
  containers: {
    files: [
      {
        expand: true,
        cwd: './lib/',
        src: ['**/*.*'],
        dest: './containers/express/dist/',
      },
      { './containers/express/dist/bin/www': './lib/bin/www' },
    ],
  },
});
