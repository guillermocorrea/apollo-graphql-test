const { ApolloServer, gql, ApolloError } = require('apollo-server');
const SessionAPI = require('./datasources/sessions');
const SpeakerAPI = require('./datasources/speakers');

const typeDefs = require('./schema');

const resolvers = require('./resolvers');

const dataSources = () => ({
  sessionAPI: new SessionAPI(),
  speakerAPI: new SpeakerAPI(),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  tracing: true,
  debug: false,
  formatError: (err) => {
    if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
      return new ApolloError('We are having some trouble', 'ERROR', { token: 'uniquetoken' });
    }
    return err;
  },
  engine: {
    graphVariant: 'current',
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphql running at ${url}`);
});
