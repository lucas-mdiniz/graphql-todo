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
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
  mutateAndGetPayload: async (args) => {
    const { description, done } = args;

    try {
      const todo = new TodoModel({
        description,
        done,
        owner: '5f5d12132dbe30184fe98027',
      });
      await todo.save();
      return {
        id: todo._id,
        error: null,
      };
    } catch (error) {
      console.log(error);
    }
  },
  outputFields: {
    todoEdge: {
      type: TodoConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        console.log(id);
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
  },
});

export default {
  ...mutation,
};
