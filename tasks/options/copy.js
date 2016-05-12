module.exports = config => ({
  containers: {
    files: [
      {
        expand: true,
        cwd: './lib/',
        src: ['**/*.*'],
        dest: './containers/expressnode/dist/',
      },
      { './containers/expressnode/dist/package.json': './package.json' },
    ],
  },
});
