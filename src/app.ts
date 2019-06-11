import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { ApolloServer, gql } from 'apollo-server-express';
import { importSchema } from 'graphql-import';

import { getResolver } from './graphql/resolvers';
import { db } from './db';

// A map of functions which return data for the schema.
const resolvers = getResolver();
const type = importSchema('./src/graphql/types/schema.graphql');

// The GraphQL schema
const typeDefs = gql`
  ${type}
`;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  rootValue: db,
  tracing: true,
});

export const app = express();
apollo.applyMiddleware({ app });

// set
app.set('port', process.env.PORT || 4000);
app.set('env', process.env.NODE_ENV || 'development');

// get
app.get('/healthz', function(req, res) {
  res.send('OK');
});

// use
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
