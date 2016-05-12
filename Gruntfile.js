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

  // docker-compose
  //grunt.registerTask('docker-compose', ['exec:docker-up']);
  //grunt.registerTask('docker-clean', ['exec:docker-stop', 'exec:docker-remove']);

  // test
  grunt.registerTask('lint', ['jshint', 'eslint']);

  // build
  grunt.registerTask('build', ['lint', 'browserify', 'copy']);
  grunt.registerTask('rebuild', ['clean', 'build']);

  // local dev servers
  grunt.registerTask('serve:local', ['rebuild', 'nodemon']);
  // grunt.registerTask('serve:docker', ['rebuild', 'docker-compose']);

  // default
  grunt.registerTask('default', [/* test, */ 'rebuild']);
};
