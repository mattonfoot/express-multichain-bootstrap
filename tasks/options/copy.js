module.exports = config => ({
  containers: {
    files: [
      {
        expand: true,
        cwd: './lib/',
        src: ['**/*.*'],
        dest: './containers/expressnode/lib/',
      },
    ],
  },
});
