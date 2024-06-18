import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  return await Course.create(payload);
};

const getAllCoursesFromDB = async () => {
  return await Course.find();
};

const getSingleCourseFromDB = async (id: string) => {
  return await Course.findById(id);
};

const deleteCourseFromDB = async (id: string) => {
  return await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
