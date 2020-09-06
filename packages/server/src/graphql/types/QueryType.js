import { GraphQLObjectType, GraphQLID, GraphQLNonNull } from 'graphql';
import {
  fromGlobalId,
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay';

import { nodeField } from '../../interface/node';
import TodoType, { TodoConnection } from '../../modules/todo/TodoType';
import Todo from '../../modules/todo/TodoModel';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    todo: {
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      type: TodoType,
      resolve: async (_, args) => {
        const { id } = fromGlobalId(args.id);
        const todo = await Todo.findById(id);
        return todo;
      },
    },
    todos: {
      type: new GraphQLNonNull(TodoConnection.connectionType),
      args: connectionArgs,
      resolve: async (_, args) => {
        const todos = await Todo.find();
        return connectionFromArray(todos, args);
      },
    },

    node: nodeField,
  }),
});

export default QueryType;
