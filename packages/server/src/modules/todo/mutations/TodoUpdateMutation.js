import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql';

import TodoModel from '../TodoModel';
import TodoType from '../TodoType';
import { TodoLoader } from '../../loader';

const mutation = mutationWithClientMutationId({
  name: 'TodoUpdate',
  inputFields: {
    description: { type: GraphQLString },
    done: { type: GraphQLBoolean },
    id: { type: new GraphQLNonNull(GraphQLID) },
  },

  /* update just the right fields */
  mutateAndGetPayload: async (args, context) => {
    if (!context.user) return { error: 'User not logged in.' };

    console.log(context);

    const updates = Object.keys(args);

    const globalId = args.id;
    const { id } = fromGlobalId(globalId);

    try {
      const todo = await TodoModel.findOne({
        _id: id,
        owner: context.user._id,
      });

      if (!todo) return { error: 'Todo does not exist.' };

      updates.forEach((update) => {
        todo[update] = args[update];
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
    todo: {
      type: TodoType,
      resolve: async ({ id }, _, context) => {
        if (!id) {
          return null;
        }

        console.log('teste');

        try {
          const updatedTodo = await TodoLoader.load(context, id);
          return updatedTodo;
        } catch (error) {
          throw new Error(error);
        }
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
