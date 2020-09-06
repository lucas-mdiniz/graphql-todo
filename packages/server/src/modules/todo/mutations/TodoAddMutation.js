import { GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import Todo from '../TodoModel';
import { TodoConnection } from '../TodoType';

const mutation = mutationWithClientMutationId({
  name: 'TodoAdd',
  inputFields: {
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    done: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
  mutateAndGetPayload: async (args) => {
    const { description, done } = args;

    try {
      const todo = new Todo({ description, done });
      await todo.save();
      return todo;
    } catch (error) {
      console.log(error);
    }
  },
  outputFields: {
    todoEdge: {
      type: TodoConnection.edgeType,
      resolve: (todo) => {
        if (!todo._id) {
          return null;
        }

        return {
          cursor: toGlobalId('Todo', todo._id),
          node: todo,
        };
      },
    },
  },
});

export default {
  ...mutation,
};
