import Dataloader from 'dataloader';
import TodoModel from './TodoModel';
import {
  mongooseLoader,
  connectionFromMongoCursor,
} from '@entria/graphql-mongoose-loader';

import { escapeRegex } from '../../common/utils';

export default class Todo {
  constructor(data) {
    this._id = data._id;
    this.id = data.id || data._id;
    this.description = data.description;
    this.done = data.done;
    this.owner = data.owner;
  }
}

export const getLoader = () =>
  new Dataloader((ids) => mongooseLoader(TodoModel, ids));

const viwerCanSee = (context, data) => context.user._id.equals(data.owner);

export const load = async (context, id) => {
  if (!id) {
    return null;
  }

  try {
    const data = await context.dataloaders.TodoLoader.load(id);

    return viwerCanSee(context, data) ? new Todo(data) : null;
  } catch (err) {
    return null;
  }
};

export const loadTodos = async (context, args) => {
  const conditions = { owner: context.user?._id };
  // For a list of elements I have to filter by the authenticated user here.
  if (args.query) {
    conditions.description = {
      $regex: new RegExp(`^(.*?(${escapeRegex(args.query)})[^$]*)$`),
      $options: 'ig',
    };
  }

  return connectionFromMongoCursor({
    cursor: TodoModel.find(conditions),
    context,
    args,
    loader: load,
  });
};
