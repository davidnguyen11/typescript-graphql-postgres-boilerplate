import { readdirSync } from 'fs';
import path from 'path';

type Resolver = {
  [key: string]: any;
};

export function getResolver() {
  let resolver: Resolver = {};

  // Register Query to resolvers
  const queries = readdirSync('./src/graphql/resolvers/queries');
  queries.forEach(name => {
    const fileName = `${path.resolve(__dirname, 'queries')}/${name}`;
    const module = require(fileName);
    resolver.Query = {
      ...resolver.Query,
      ...module,
    };
  });

  // Register Mutation to resolvers
  const mutations = readdirSync('./src/graphql/resolvers/mutations');
  mutations.forEach(name => {
    const fileName = `${path.resolve(__dirname, 'mutations')}/${name}`;
    const module = require(fileName);
    resolver.Mutation = {
      ...resolver.Mutation,
      ...module,
    };
  });

  // Register scalar types
  const scalarTypes = readdirSync('./src/graphql/resolvers/types');
  scalarTypes.forEach(name => {
    const fileName = `${path.resolve(__dirname, 'types')}/${name}`;
    const module = require(fileName);
    const key = Object.keys(module.default)[0];
    resolver[key] = module.default[key];
  });

  return resolver;
}
