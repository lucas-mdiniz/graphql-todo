import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { nodeInterface } from '../../interface/node';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
