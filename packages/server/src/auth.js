import jwt from 'jsonwebtoken';

import User from './modules/user/UserModel';
import { config } from './config';

const getUser = async (token) => {
  try {
    if (!token) {
      return { user: null, token };
    }

    token = token.split('Bearer ')[1];
    const { id } = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findOne({ _id: id, 'tokens.token': token });

    return { user, token };
  } catch (err) {
    return { user: null, token };
  }
};

export default getUser;
