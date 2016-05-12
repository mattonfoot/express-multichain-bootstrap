module.exports = config => ({
  options: {
    jshintrc: '.jshintrc',
  },
  gruntfile: ['Gruntfile.js', 'tasks/**/*.js'],
  src: [
    'lib/ui/**/*.js',
    'lib/routes/**/*.js',
  ],

  //  test: ['test/**/*.js'],

});
