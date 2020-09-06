import { nodeDefinitions, fromGlobalId } from 'graphql-relay';

import Todo from '../modules/todo/TodoModel';
import TodoType from '../modules/todo/TodoType';

const { nodeField, nodeInterface } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Todo') {
      const todo = await Todo.findById(id);
      return todo;
    } else if (type === 'User') {
      const user = await User.findById(id);
      return user;
    }
  },
  (obj) => {
    if (obj.constructor.modelName === 'Todo') {
      return TodoType;
    } else if (obj.constructor.modelName === 'User') {
      return UserType;
    }
  }
);

export { nodeField, nodeInterface };
