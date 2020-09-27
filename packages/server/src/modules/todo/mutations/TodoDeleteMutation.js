import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import TodoModel from '../TodoModel';
import Todo from '../TodoLoader';
import TodoType from '../TodoType';

const mutation = mutationWithClientMutationId({
  name: 'TodoDelete',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async (args, context) => {
    if (!context.user) return { error: 'User not logged in.' };
    console.log(context.user);

    const globalID = args.id;
    const { id } = fromGlobalId(globalID);

    try {
      const todo = await TodoModel.findByIdAndDelete(id);
      if (!todo) return { error: 'Todo does not exist.' };

      return { todo: new Todo(todo) };
    } catch (error) {
      throw new Error(error);
    }
  },
  outputFields: {
    todo: {
      type: TodoType,
      resolve: ({ todo }) => todo,
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
