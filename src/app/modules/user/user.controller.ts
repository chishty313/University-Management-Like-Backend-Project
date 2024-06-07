import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  // Creating a schema validation using zod
  const { password, student: studentData } = req.body;

  // // data validation using joi
  // const { error, value } = StudentValidationSchema.validate(studentData);

  //   Will call service function to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
