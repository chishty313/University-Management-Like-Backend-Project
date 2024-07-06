import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const enrolledCourseResult =
    await EnrolledCourseServices.createEnrolledCourseIntoDB(
      req.user.userId,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled successfully',
    data: enrolledCourseResult,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const enrolledCourseResult =
    await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
      req.user.userId,
      req.query,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses are retrivied succesfully',
    meta: enrolledCourseResult.meta,
    data: enrolledCourseResult.result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const updateEnrolledCourseMarksResult =
    await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
      userId,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student marks updated successfully',
    data: updateEnrolledCourseMarksResult,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getMyEnrolledCourses,
};
