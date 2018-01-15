import restify from 'restify';
import { graphqlRestify, graphiqlRestify } from 'apollo-server-restify';
require('./src/config/database');
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './src/graphql/typeDefs';
import resolvers from './src/graphql/resolvers';
import context from './src/graphql/context';


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 3000;

const server = restify.createServer({
  title: 'Apollo Server',
});

const graphQLOptions = { schema, context };

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.post('/graphql', graphqlRestify(graphQLOptions));
server.get('/graphql', graphqlRestify(graphQLOptions));

server.get('/graphiql', graphiqlRestify({ endpointURL: '/graphql' }));

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
