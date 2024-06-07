import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    // Creating a schema validation using zod
    const { password, student: studentData } = req.body;

    // const zodParsedData = StudentValidationSchema.parse(studentData);

    // // data validation using joi
    // const { error, value } = StudentValidationSchema.validate(studentData);

    //   Will call service function to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // Send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
