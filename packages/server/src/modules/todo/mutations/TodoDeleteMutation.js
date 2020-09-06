import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import Todo from '../TodoModel';
import TodoType from '../TodoType';

const mutation = mutationWithClientMutationId({
  name: 'TodoDelete',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async (args) => {
    const globalID = args.id;
    const { id } = fromGlobalId(globalID);

    try {
      const todo = await Todo.findByIdAndDelete(id);
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
