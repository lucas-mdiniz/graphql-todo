import jwt from 'jsonwebtoken';

import User from './modules/user/UserModel';
import { config } from './config';

const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }

    token = token.split('Bearer ')[1];
    const { id } = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findOne({ _id: id, 'tokens.token': token });

    return user;
  } catch (err) {
    return { user: null };
  }
};

export default getUser;
