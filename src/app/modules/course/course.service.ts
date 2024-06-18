import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constants';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  return await Course.create(payload);
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .sort()
    .filter()
    .paginate()
    .fields();
  return await courseQuery.modelQuery;
};

const getSingleCourseFromDB = async (id: string) => {
  return await Course.findById(id).populate('preRequisiteCourses.course');
};

const deleteCourseFromDB = async (id: string) => {
  return await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).populate('preRequisiteCourses.course');
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  // step - 1: basic course info update
  const updatedBasicCourseinfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    { new: true, runValidators: true },
  );

  // check if there is any pre-requisite courses to update
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the deleted fields
    const deletePreRequisites = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          preRequisiteCourses: { course: { $in: deletePreRequisites } },
        },
      },
      { new: true },
    );
  }

  return updatedBasicCourseinfo;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
