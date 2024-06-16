import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  return await facultyQuery.modelQuery;
};

const getSingleFacultyFromDB = async (facultyId: string) => {
  return await Faculty.findOne({ id: facultyId }).populate(
    'academicDepartment',
  );
};

const updateFacultyIntoDB = async (
  facultyId: string,
  payload: Partial<TFaculty>,
) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  return await Faculty.findOneAndUpdate({ id: facultyId }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
};

const deleteFacultyFromDB = async (facultyId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findOneAndUpdate(
      { id: facultyId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted faculty');
    }

    const userId = deletedFaculty.id;
    const deletedUser = await User.findOneAndUpdate(
      { id: userId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty user');
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
  deleteFacultyFromDB,
};
