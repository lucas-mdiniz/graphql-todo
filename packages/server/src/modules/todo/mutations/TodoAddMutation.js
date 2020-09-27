import { GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import * as TodoLoader from '../TodoLoader';
import TodoModel from '../TodoModel';
import { TodoConnection } from '../TodoType';

const mutation = mutationWithClientMutationId({
  name: 'TodoAdd',
  inputFields: {
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    done: {
      type: GraphQLBoolean,
    },
  },
  mutateAndGetPayload: async (args, context) => {
    const { description, done } = args;

    if (!context.user) {
      return {
        error: 'User not logged in.',
      };
    }

    try {
      const todo = new TodoModel({
        description,
        done,
        owner: context.user._id,
      });

      await todo.save();

      return {
        id: todo._id,
        error: null,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  outputFields: {
    todoEdge: {
      type: TodoConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        if (!id) {
          return null;
        }

        const newTodo = await TodoLoader.load(context, id);

        return {
          cursor: toGlobalId('Todo', newTodo.id),
          node: newTodo,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default {
  ...mutation,
};
