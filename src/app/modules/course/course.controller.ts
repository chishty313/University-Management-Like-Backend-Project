import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const createdCourseResult = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: createdCourseResult,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const getAllCoursesResult = await CourseServices.getAllCoursesFromDB(
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All courses are retrived successfully',
    data: getAllCoursesResult,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const getSingleCourseResult = await CourseServices.getSingleCourseFromDB(
    req.params.courseId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrived successfully',
    data: getSingleCourseResult,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const deleteCourseResult = await CourseServices.deleteCourseFromDB(
    req.params.courseId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: deleteCourseResult,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const updatedCourseResult = await CourseServices.updateCourseIntoDB(
    req.params.courseId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: updatedCourseResult,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const assignFacultiesWithCourseResult =
    await CourseServices.assignFacultiesWithCourseIntoDB(
      req.params.courseId,
      req.body.faculties,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is assigned with faculties successfully',
    data: assignFacultiesWithCourseResult,
  });
});

const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const getFacultiesWithCourseResult =
    await CourseServices.getFacultiesWithCourseFromDB(req.params.courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties retrived successfully',
    data: getFacultiesWithCourseResult,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const removeFacultiesFromCourseResult =
    await CourseServices.removeFacultiesFromCourseFromDB(
      req.params.courseId,
      req.body.faculties,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is assigned with faculties successfully',
    data: removeFacultiesFromCourseResult,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
  getFacultiesWithCourse,
};
