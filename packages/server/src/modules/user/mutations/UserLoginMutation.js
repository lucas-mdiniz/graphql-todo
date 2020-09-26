import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import User from '../UserModel';
import UserType from '../UserType';

const mutation = mutationWithClientMutationId({
  name: 'UserLogin',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, password }, context) => {
    const user = await User.findByCredentials(email, password);

    const errorMessage = 'Unable to login';

    if (!user) {
      return {
        error: errorMessage,
      };
    }

    const token = await user.generateAuthToken();

    return {
      user,
      token,
      error: null,
    };
  },
  outputFields: {
    me: {
      type: UserType,
      resolve: ({ user }) => user,
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
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
