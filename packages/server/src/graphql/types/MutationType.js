import { GraphQLObjectType } from 'graphql';

import TodoMutations from '../../modules/todo/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...TodoMutations,
  }),
});

export default MutationType;

/*const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createTodo: {
      type: TodoType,
      args: {
        input: { type: GraphQLNonNull(TodoInput) },
      },
      resolve: async (_, { input }) => {
        const todo = new Todo(input);
        await todo.save();
        return todo;
      },
    },
    updateTodo: {
      type: TodoType,
      args: {
        input: { type: GraphQLNonNull(TodoInput) },
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        const { input } = args;
        const globalID = args.id;

        const { id } = fromGlobalId(globalID);

        const todo = await Todo.findByIdAndUpdate(id, input, { new: true });
        return todo;
      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        const globalID = args.id;

        const { id } = fromGlobalId(globalID);

        const todo = await Todo.findByIdAndDelete(id);
        return todo;
      },
    },
  }),
});*/
