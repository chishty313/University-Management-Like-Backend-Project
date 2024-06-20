import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

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
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Blocked!!');
  }

  // checking if the password is correct or not
  if (!(await User.isPasswordMatched(password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched !!');
  }

  // Access Granted: send AccessToken, RefreshToken
  // create token and send to the client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secrect as string,
    {
      expiresIn: '10d',
    },
  );

  return { accessToken, needsPasswordChange: user?.needsPasswordChange };
};

export const AuthServices = {
  loginUser,
};
