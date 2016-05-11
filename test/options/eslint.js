module.exports = ({
  options: {
    eslintrc: true,
  },
  gruntfile: ['Gruntfile.js', 'tasks/**/*.js'],
  src: ['lib/**/*.js'],
  test: ['test/**/*.js'],
});
