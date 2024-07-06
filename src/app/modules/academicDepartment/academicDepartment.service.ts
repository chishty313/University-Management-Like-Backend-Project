import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicDepartmentSearchableFields } from './academicDepartment.constant';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  return await AcademicDepartment.create(payload);
};

const getAllAcademicDepartmentsFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  )
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicDepartmentQuery.modelQuery;
  const meta = await academicDepartmentQuery.countTotal();
  return {
    meta,
    result,
  };
};

const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  return await AcademicDepartment.findById(departmentId).populate(
    'academicFaculty',
  );
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
