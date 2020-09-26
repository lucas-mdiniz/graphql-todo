import { GraphQLObjectType } from 'graphql';

import TodoMutations from '../../modules/todo/mutations';
import UserMutations from '../../modules/user/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...TodoMutations,
    ...UserMutations,
  }),
});

export default MutationType;
