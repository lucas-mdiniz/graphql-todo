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
  graphqlHTTP(async () => {
    const dataloaders = getDataloaders(loaders);
    return {
      schema: schema,
      graphiql: true,
      context: {
        user: await getUser(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWUyMWFlNDllNGRmYTAyZTc3MjUxZiIsImlhdCI6MTYwMDE4NTc5Mn0.DwRkCm5magC7TeVnussco7_e-qhDvx4g_Uze5B_ihfo'
        ),
        dataloaders,
      },
    };
  })
);

app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
