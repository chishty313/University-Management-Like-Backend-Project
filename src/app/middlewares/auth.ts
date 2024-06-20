import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!!');
    }

    // check if the token is valid or not
    const decoded = jwt.verify(
      token,
      config.jwt_access_secrect as string,
    ) as JwtPayload;

    const { userId, role, iat, exp } = decoded;

    // checking if the user already exists or not
    const user = await User.isUserExistsByCustomId(userId);

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
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!!');
    }
    // decoded
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
