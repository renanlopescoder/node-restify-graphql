import restify from 'restify'
import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify'
require('./src/config/database')
import { makeExecutableSchema, addSchemaLevelResolveFunction } from 'graphql-tools'
import typeDefs from './src/graphql/typeDefs'
import resolvers from './src/graphql/resolvers'
import context from './src/graphql/context'
import Authentication from './src/controllers/auth'
import Registration from './src/controllers/registration'
import cluster from 'cluster'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const PORT = (process.env.PORT || 8888)
const graphQLOptions = { schema, context }

if (cluster.isMaster) {
  console.log('Master server is active. Forking workers now.')

  let cpuCount = require('os').cpus().length
  for (let i=0; i < cpuCount; i++){
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.error(`Worker ${worker.id} has died! Creating a new one.`)
    cluster.fork()
  })
} else {
  let server  = restify.createServer({'Node Server': 'v1.0.0'})

  server.use(restify.plugins.bodyParser())
  server.use(restify.plugins.queryParser())

  server.post('/login', Authentication.login)
  server.post('/registration', Registration.register)

  server.get('/graphql', graphqlRestify(graphQLOptions))

  server.post('/graphql', graphqlRestify(
    async (req, res) => {
      return await Authentication.verifyToken(req, res, graphQLOptions)
    }
  ))
  server.post('/graphqlTest', graphqlRestify(graphQLOptions))
  server.get('/graphiql', graphiqlRestify({ endpointURL: '/graphqlTest' }))

  server.listen(PORT, () => {
    console.log(`Worker ${cluster.worker.id} spawned for port ${PORT}.`)
  })
}
