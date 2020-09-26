import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import Todo from '../modules/todo/TodoLoader';
import TodoType from '../modules/todo/TodoType';
import User from '../modules/user/UserLoader';
import UserType from '../modules/user/UserType';

import * as TodoLoader from '../modules/todo/TodoLoader';

const { nodeField, nodeInterface } = nodeDefinitions(
  async (globalId, context) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Todo') {
      const todo = await TodoLoader.load(context, id);
      return todo;
    } else if (type === 'User') {
      const user = await User.findById(id);
      return user;
    }
  },
  (obj) => {
    console.log();
    if (obj instanceof Todo) {
      return TodoType;
    } else if (obj instanceof User) {
      return UserType;
    }
  }
);

export { nodeField, nodeInterface };
