const http = require('http');

const { port, dbUrl } = require('./config');
const logger = require('./logger');
const database = require('./database');

database.connect(dbUrl);

const app = require('./server');

const server = http.createServer(app);
server.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
