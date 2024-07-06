import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const createOfferedCourseResult =
    await OfferedCourseServices.createOfferedCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is created successfully',
    data: createOfferedCourseResult,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const getAllOfferedCoursesResult =
    await OfferedCourseServices.getAllOfferedCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Offered course is retrived successfully',
    meta: getAllOfferedCoursesResult.meta,
    data: getAllOfferedCoursesResult.result,
  });
});

const getMyOfferedCourses = catchAsync(async (req, res) => {
  const getMyOfferedCoursesResult =
    await OfferedCourseServices.getMyOfferedCoursesFromDB(
      req.user.userId,
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All my Offered courses are retrived successfully',
    meta: getMyOfferedCoursesResult.meta,
    data: getMyOfferedCoursesResult.result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const getSingleOfferedCourseResult =
    await OfferedCourseServices.getSingleOfferedCourseFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Offered course is retrived successfully',
    data: getSingleOfferedCourseResult,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const updateOfferedCourseResult =
    await OfferedCourseServices.updateOfferedCourseIntoDB(
      req.params.id,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is updated successfully',
    data: updateOfferedCourseResult,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const deleteOfferedCourseResult =
    await OfferedCourseServices.deleteOfferedCourseFromFB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course is deleted successfully',
    data: deleteOfferedCourseResult,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  deleteOfferedCourse,
  getMyOfferedCourses,
};
