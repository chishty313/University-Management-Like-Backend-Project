import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  // check if the semester registration id exists or not !!
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration is not found !!!',
    );
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  // check if the academic faculty id exists or not !!
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Faculty is not found !!!',
    );
  }

  // check if the Academic Department id exists or not !!
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not found !!!',
    );
  }

  // check if the course id exists or not !!
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found !!!');
  }
  // check if the faculty id exists or not !!
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found !!!');
  }

  return await OfferedCourse.create({ ...payload, academicSemester });
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {};

const getSingleOfferedCourseFromDB = async (id: string) => {};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
};
