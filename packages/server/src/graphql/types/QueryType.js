import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { fromGlobalId, connectionArgs } from 'graphql-relay';

import { nodeField } from '../../interface/node';
import TodoType, { TodoConnection } from '../../modules/todo/TodoType';
import UserType from '../../modules/user/UserType';
import * as TodoLoader from '../../modules/todo/TodoLoader';
import * as UserLoader from '../../modules/user/UserLoader';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    todo: {
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      type: TodoType,
      resolve: async (_, { id }, context) =>
        await TodoLoader.load(context, fromGlobalId(id).id),
    },
    todos: {
      type: TodoConnection.connectionType,
      args: connectionArgs,
      resolve: async (_, args, context) =>
        await TodoLoader.loadTodos(context, args),
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }, context) =>
        await UserLoader.load(context, fromGlobalId(id).id),
    },
    search: {
      type: TodoConnection.connectionType,
      args: {
        ...connectionArgs,
        query: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, context) =>
        await TodoLoader.loadTodos(context, args),
    },

    node: nodeField,
  }),
});

export default QueryType;
