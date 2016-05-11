module.exports = grunt => {
  'use strict';

  // helper function to load task configs

  function loadConfig(path, config) {
    var glob = require('glob');

    var object = {};
    var key;

    glob.sync('*', { cwd: path }).forEach(option => {
      key = option.replace(/\.js$/, '');
      object[key] = require(path + option)(config);
    });

    return object;
  }

  // actual config

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,
    __dirname: __dirname,
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/', config));

  grunt.initConfig(config);

  // load grunt tasks
  require('load-grunt-tasks')(grunt);

  // local tasks
  grunt.loadTasks('tasks');

  // test
  grunt.registerTask('lint', ['jshint', 'eslint']);

  // build
  grunt.registerTask('build', ['lint', 'browserify', 'copy']);
  grunt.registerTask('rebuild', ['clean', 'build']);

  // docker containers
  //grunt.registerTask('dock', ['dock:dev:build', 'dock:dev:start']);

  // local dev servers
  grunt.registerTask('serve', ['rebuild', 'nodemon']);

  // default
  grunt.registerTask('default', [/* test, */ 'serve']);
};
