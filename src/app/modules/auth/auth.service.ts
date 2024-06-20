import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;
  // checking if the user already exists or not
  const isUserExists = await User.findOne({ id: id });
  console.log(isUserExists);

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  }

  // checking if the user is already deleted or not
  const isUserDeleted = isUserExists?.isDeleted;

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted!!');
  }

  // checking if the user is blocked or not
  const isUserBlocked = isUserExists?.status;

  if (isUserBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked!!');
  }

  // checking if the password is correct or not
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExists?.password,
  );
  console.log(isPasswordMatched);

  // Access Granted: send AccessToken, RefreshToken
};

export const AuthServices = {
  loginUser,
};
