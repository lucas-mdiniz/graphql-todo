import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString } from 'graphql';

const mutation = mutationWithClientMutationId({
  name: 'UserLogout',
  mutateAndGetPayload: async (_, { user, token }) => {
    if (!user) return { error: 'User not logged in.' };

    try {
      user.tokens = user.tokens.filter((currentToken) => {
        return token !== currentToken.token;
      });

      await user.save();

      return { success: 'Logged out.' };
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
