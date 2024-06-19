import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  return await OfferedCourse.create(payload);
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
