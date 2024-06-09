import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userScehma = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['student', 'faculty', 'admin'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// pre save middleware/ : will work on create() save()
userScehma.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');

  const user = this; // "this" refers to document
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/hook
// Set '' after saving password
userScehma.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userScehma);
