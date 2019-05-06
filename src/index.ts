import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from "type-graphql";

import TransactionResolver from "./transaction/resolver";

import { fetchDelegates } from "./delegate-resolver";

async function bootstrap() {
  await fetchDelegates();
  const schema = await buildSchema({
    resolvers: [TransactionResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql")
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
