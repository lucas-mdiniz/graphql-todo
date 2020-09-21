import Dataloader from 'dataloader';
import TodoModel from './TodoModel';
import {
  mongooseLoader,
  connectionFromMongoCursor,
  unbase64,
} from '@entria/graphql-mongoose-loader';

export default class Todo {
  constructor(data) {
    this.id = data.id || data._id;
    this.description = data.description;
    this.done = data.done;
    this.owner = data.owner;
  }
}

export const getLoader = () =>
  new Dataloader((ids) => mongooseLoader(TodoModel, ids));

export const load = async (context, id) => {
  if (!id) {
    return null;
  }

  try {
    const data = await context.dataloaders.TodoLoader.load(id);

    return new Todo(data);
  } catch (err) {
    return null;
  }
};

export const loadTodos = async (context, args) => {
  return connectionFromMongoCursor({
    cursor: TodoModel.find(),
    context,
    args,
    loader: load,
  });
};
