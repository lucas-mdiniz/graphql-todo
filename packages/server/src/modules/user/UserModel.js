import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { config } from '../../config';

const { Schema } = mongoose;

const UserSchema = new Schema({
  //TODO validate if is email
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

UserSchema.pre('save', async function hashPassword(next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

UserSchema.methods.generateAuthToken = async function generateAuthToken() {
  const user = this;

  const token = jwt.sign({ id: user._id.toString() }, config.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async function findByCredentials(
  email,
  password
) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null;
  }

  return user;
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
