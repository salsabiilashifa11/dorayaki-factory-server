const http = require('http');
const stoppable = require('stoppable');
const app = require('./app');
const logger = require('./api/utils/Logger');

function normalizePort(val) {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = stoppable(http.createServer(app));

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  logger.log('info', `Listening on ${bind}`);
}

function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }

  const bind = typeof port === 'string'
    ? `pipe ${port}`
    : `port ${port}`;

  switch (err.code) {
  case 'EACCES':
    logger.log('error', `${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    logger.log('error', `${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw err;
  }
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
