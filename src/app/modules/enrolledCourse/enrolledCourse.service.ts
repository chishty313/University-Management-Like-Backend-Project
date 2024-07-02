import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { Student } from '../student/student.model';
import { EnrolledCourse } from './enrolledCourse.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  /**
   * 1. Check if the offered course is exists
   * 2. check if the student is already enrolled
   * 3. create an enrolled course
   */

  const { offeredCourse } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found !!!');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Course max capacity is reached !!!',
    );
  }

  const student = await Student.findOne({ id: userId }).select('_id');

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !!!');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled !!!');
  }
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
