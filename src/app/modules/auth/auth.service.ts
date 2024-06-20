import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  const { id, password } = payload;
  // checking if the user already exists or not
  const user = await User.isUserExistsByCustomId(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  }

  // checking if the user is already deleted or not
  const isUserDeleted = user?.isDeleted;

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted!!');
  }

  // checking if the user is blocked or not
  const isUserBlocked = user?.status;

  if (isUserBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked!!');
  }

  // checking if the password is correct or not
  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched !!');
  }

  // Access Granted: send AccessToken, RefreshToken
};

export const AuthServices = {
  loginUser,
};
