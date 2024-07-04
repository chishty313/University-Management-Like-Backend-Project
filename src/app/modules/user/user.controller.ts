import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const createFacultyResult = await UserServices.createFacultyIntoDB(
    req.file,
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
    req.file,
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
  const { userId, role } = req.user;

  const getMeResult = await UserServices.getMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${role} is retrived successfully`,
    data: getMeResult,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const changeStatusResult = await UserServices.changeStatusIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: changeStatusResult,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
