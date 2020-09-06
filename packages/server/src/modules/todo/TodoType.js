import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

import { nodeInterface } from '../../interface/node';
import { globalIdField, connectionDefinitions } from 'graphql-relay';

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
    done: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
  },
  interfaces: () => [nodeInterface],
});

export const TodoConnection = connectionDefinitions({
  name: 'Todo',
  nodeType: GraphQLNonNull(TodoType),
});

export default TodoType;
