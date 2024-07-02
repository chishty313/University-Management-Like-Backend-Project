import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const enrolledCourse = catchAsync(async (req, res) => {
  const enrolledCourseResult =
    await EnrolledCourseServices.createEnrolledCourseIntoDB(
      req.user.userId,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled successfully',
    // data: enrolledCourseResult,
    data: null,
  });
});

export const EnrolledCourseControllers = {
  enrolledCourse,
};
