import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

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
    message: 'Student is created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const createFacultyResult = await UserServices.createFacultyIntoDB(
    req.body.password,
    req.body.faculty,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: createFacultyResult,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const createAdminResult = await UserServices.createAdminIntoDB(
    req.body.password,
    req.body.admin,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: createAdminResult,
  });
});

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, 'Token not found !!!!!!!');
  }
  const getMeResult = await UserServices.getMeFromDB(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: getMeResult,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
