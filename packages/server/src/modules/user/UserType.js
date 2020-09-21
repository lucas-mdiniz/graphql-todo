import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';
import { nodeInterface } from '../../interface/node';

import { TodoConnection } from '../todo/TodoType';
import Todo from '../todo/TodoModel';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    todos: {
      type: GraphQLNonNull(TodoConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (user, args) => {
        const todos = await Todo.find({ owner: user._id });
        return connectionFromArray(todos, args);
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
