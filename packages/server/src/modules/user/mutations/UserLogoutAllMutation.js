import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString } from 'graphql';

const mutation = mutationWithClientMutationId({
  name: 'UserLogoutAll',
  mutateAndGetPayload: async (_, { user, token }) => {
    if (!user) return { error: 'User not logged in.' };

    try {
      user.tokens = [];

      await user.save();

      return { success: 'Logged out from all devices.' };
    } catch (error) {
      throw new Error(error);
    }
  },
  outputFields: {
    message: {
      type: GraphQLString,
      resolve: ({ success }) => success,
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
