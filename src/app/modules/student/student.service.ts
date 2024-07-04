import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // console.log({ queryFromStudentServiceGetAllStudentsFromDB: query });
  // const queryObj = { ...query }; // copy

  // { email: { $regex: query.searchTerm, $options: 'i' } }
  // { presentAddress: { $regex: query.searchTerm, $options: 'i' } }
  // { 'name.firstName': { $regex: query.searchTerm, $options: 'i' } }
  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((elem) => delete queryObj[elem]);
  // console.log({ basicQuery: query, afterExcludingQuery: queryObj });

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   })
  //   .populate('user');

  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const limitQuery = sortQuery.limit(limit);

  // const paginateQuery = limitQuery.skip(skip);

  // // field limiting
  // let fields = '-__v';

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  //   console.log({ fields });
  // }

  // const fieldQuery = await paginateQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();
  return { meta, result };
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById({ _id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('user');
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  // const isUserIdExist = await User.findById({ _id: id });
  // const isStudentIdExist = await Student.findById({ _id: id });
  // if (!isUserIdExist || !isStudentIdExist) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  // }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deleted student
    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

const updateStudentIntoDB = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  /**
   * "guardian": {
            "fatherOccupation": "Teacher"
        }
    This will be mutated

    guardian.fatherOccupation = "Teacher"

    name.firstName = "Shoabur"
    name.lastName = "Chishty"
    this won't be mutated and we have to create this.
   */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(
    { _id: studentId },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
