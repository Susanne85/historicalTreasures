const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require('neo4j-driver');
const path = require('path');

const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schema/index');

const PORT = process.env.PORT || 3001;

const expressApp = express();
 
const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  )
)

const neoSchema = new Neo4jGraphQL({ typeDefs, driver })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    authMiddleware,
    driver,
    driverConfig: { database: process.env.NEO4J_DATABASE || 'neo4j' },
  },
  schema: neoSchema.schema,
  introspection: true,
  playground: true,
})

server.applyMiddleware({ app: expressApp });

expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  expressApp.use(express.static(path.join(__dirname, '../client/build')));
}

expressApp.use(routes);

expressApp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  expressApp.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
