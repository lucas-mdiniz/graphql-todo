import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import './db/mongoose';
import schema from './graphql/schema';
import getUser from './auth';

import * as loaders from './modules/loader';
import { getDataloaders } from './modules/loader/loaderRegistry';

const app = express();

app.use(
  '/graphql',
  graphqlHTTP(async (req) => {
    const dataloaders = getDataloaders(loaders);
    return {
      schema: schema,
      graphiql: true,
      context: {
        user: await getUser(req.headers.authorization),
        dataloaders,
      },
    };
  })
);

app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
