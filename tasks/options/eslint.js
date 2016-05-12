module.exports = config => ({
  options: {
    eslintrc: true,
  },
  gruntfile: ['Gruntfile.js', 'tasks/**/*.js'],
  src: [
    'lib/ui/**/*.js',
    'lib/routes/**/*.js',
  ],

  //  test: ['test/**/*.js'],

});
