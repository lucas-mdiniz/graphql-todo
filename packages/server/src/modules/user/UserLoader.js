import Dataloader from 'dataloader';
import { mongooseLoader } from '@entria/graphql-mongoose-loader';

import UserModel from './UserModel';

class User {
  constructor(data) {
    (this.id = data.id || data._id),
      (this.email = data.email),
      (this.password = data.password),
      (this.tokens = data.tokens);
  }
}

export const getLoader = () =>
  new Dataloader((ids) => mongooseLoader(UserModel, ids));

export const load = async (context, id) => {
  if (!id) {
    return null;
  }

  try {
    const data = await context.dataloaders.UserLoader.load(id);
    return new User(data);
  } catch (err) {
    console.log(err);
    return null;
  }
};
