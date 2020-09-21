import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import User from '../UserModel';
import UserType from '../UserType';

const mutation = mutationWithClientMutationId({
  name: 'UserAdd',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args) => {
    const { email, password } = args;

    try {
      const user = new User({
        email: email,
        password: password,
      });

      const token = await user.generateAuthToken();

      return {
        user,
        token,
      };
    } catch (error) {
      console.log(error);
    }
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
  },
});

export default {
  ...mutation,
};
