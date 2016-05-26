module.exports = config => ({
  'docker-up': { cmd: 'docker-compose up --build' },
  'docker-stop': { cmd: 'docker-compose kill' },
  'docker-clean': { cmd: 'docker-compose rm -afv' },
});
