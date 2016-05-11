module.exports = config => ({
  options: {
    eslintrc: true,
  },
  gruntfile: ['Gruntfile.js', 'tasks/**/*.js'],
  src: ['lib/**/*.js'],

  //  test: ['test/**/*.js'],

});
