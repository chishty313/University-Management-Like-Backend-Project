import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  return await AcademicDepartment.create(payload);
};

const getAllAcademicDepartmentsFromDB = async () => {
  return await AcademicDepartment.find();
};

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  return await AcademicDepartment.findById(departmentId);
};

const updateAcademicDepartmentIntoDB = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
) => {
  return AcademicDepartment.findOneAndUpdate({ _id: departmentId }, payload, {
    new: true,
  });
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
