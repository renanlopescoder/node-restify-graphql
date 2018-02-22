require('newrelic');

import restify from 'restify';
import cluster from 'cluster';
import { graphqlRestify } from 'apollo-server-restify';
import Authentication from './src/controllers/auth';
import Registration from './src/controllers/registration';

require('./src/config/database');
const CPUS = require('os').cpus().length;

const PORT = (process.env.PORT || 8888);
const CPU_BY_WORKER = 2;
const WORKERS = (CPUS / CPU_BY_WORKER);

if (cluster.isMaster) {
  console.log(`Server is active, forking ${WORKERS} workers with ${CPU_BY_WORKER} cpu by worker`);

  for (let i = 0; i < WORKERS; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.error(`Worker ${worker.id} has died! Creating a new one.`);
    cluster.fork();
  });
} else {
  const server = restify.createServer({ 'Node Server': 'v1.0.0' });

  server.use(restify.plugins.bodyParser());
  server.use(restify.plugins.queryParser());

  server.post('/login', Authentication.login);
  server.post('/registration', Registration.register);
  server.get('/graphql', graphqlRestify((req, res) => Authentication.verifyToken(req, res)));
  server.post('/graphql', graphqlRestify((req, res) => Authentication.verifyToken(req, res)));

  server.listen(PORT, () => {
    console.info(`Worker ${cluster.worker.id} spawned in ${PORT}`);
  });
}
