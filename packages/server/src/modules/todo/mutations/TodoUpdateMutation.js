import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql';

import Todo from '../TodoModel';
import TodoType from '../TodoType';

const mutation = mutationWithClientMutationId({
  name: 'TodoUpdate',
  inputFields: {
    description: { type: new GraphQLNonNull(GraphQLString) },
    done: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: new GraphQLNonNull(GraphQLID) },
  },

  /* update just the right fields */
  mutateAndGetPayload: async (args) => {
    const { description, done } = args;

    const globalId = args.id;
    const { id } = fromGlobalId(globalId);

    try {
      const todo = await Todo.findByIdAndUpdate(
        id,
        { description, done },
        { new: true }
      );
      return todo;
    } catch (error) {
      console.log(error);
    }
  },
  outputFields: {
    todo: {
      type: TodoType,
      resolve: (todo) => {
        return todo;
      },
    },
  },
});

export default {
  ...mutation,
};
