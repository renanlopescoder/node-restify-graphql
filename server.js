import restify from 'restify'
import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify'
require('./src/config/database')
import { makeExecutableSchema, addSchemaLevelResolveFunction } from 'graphql-tools'
import typeDefs from './src/graphql/typeDefs'
import resolvers from './src/graphql/resolvers'
import context from './src/graphql/context'
import Authentication from './src/controllers/auth'
import Registration from './src/controllers/registration'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const PORT = 4000

const server = restify.createServer({ title: 'restify' })

const graphQLOptions = { schema, context }

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

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
