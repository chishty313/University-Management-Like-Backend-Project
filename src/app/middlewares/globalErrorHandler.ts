import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Setting default Values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Ami zod Error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error,
  });
};

export default globalErrorHandler;

/**
 * Pattern =>
 *
 * success
 * message
 * errorSources: [
 * path: '',
 * message: ''
 * ]
 * stack
 */
