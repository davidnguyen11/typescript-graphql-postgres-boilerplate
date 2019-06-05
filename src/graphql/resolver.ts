import { readdirSync } from 'fs';
import path from 'path';

type Resolver = {
  [key: string]: any
};

export function getResolver() {
  let resolver: Resolver = {};
  // Register resolvers
  const files = readdirSync('./src/graphql/resolvers');

  files.forEach(name => {
    const fileName = `${path.resolve(__dirname, 'resolvers')}/${name}`;
    const module = require(fileName);
    resolver.Query = (module.default && module.default.Query) ? { ...resolver.Query, ...module.default.Query } : {};
    resolver.Mutation = (module.default && module.default.Mutation) ? { ...resolver.Mutation, ...module.default.Mutation } : {};
  });

  // Register scalar types
  const scalarTypes = readdirSync('./src/graphql/scalar-type');

  scalarTypes.forEach(name => {
    const fileName = `${path.resolve(__dirname, 'scalar-type')}/${name}`;
    const module = require(fileName);
    const key = Object.keys(module.default)[0];
    resolver[key] = module.default[key];
  });

  return resolver;
}
