import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  return await adminQuery.modelQuery;
};

const getSingleAdminFromDB = async (adminId: string) => {
  return await Admin.findOne({ id: adminId });
};

const updateAdminIntoDB = async (adminId: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdateData: Record<string, unknown> = { ...remainingAdminData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  return await Admin.findOneAndUpdate({ id: adminId }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
};

const deleteAdminFromDB = async (adminId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteAdmin = await Admin.findOneAndUpdate(
      { id: adminId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }

    const userId = deleteAdmin.user;

    const deleteUser = await User.findOneAndUpdate(
      { id: userId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteAdmin;
  } catch (error) {
    session.abortTransaction();
    session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin user');
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
