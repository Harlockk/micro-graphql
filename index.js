const micro = require('micro');
const graphqlHTTP = require('express-graphql');

const schemaGenerator = require('./schemas');
const resolverGenerator = require('./resolvers');

async function main() {
  const LISTENING_PORT = 3000;
  const schema = await schemaGenerator();
  const rootValue = await resolverGenerator();

  const server = micro(
    graphqlHTTP({
      schema,
      rootValue,
      graphiql: true,
    }));

  server.listen(LISTENING_PORT);
  console.log('Server listening on port', LISTENING_PORT); // eslint-disable-line
}

main();
