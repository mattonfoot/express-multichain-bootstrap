const express = require('express');
const http = require('http');

const port = process.env.PORT || 9001;
const host = process.env.HOST || '0.0.0.0';

const onListen = () => console.log('Express server listening on %s:%s', host, port);

// create Express app
const app = express();

// serve static directories
app.use(express.static('lib/www'));

// start the server
const server = http.createServer(app);
server.listen(port, host, onListen);
