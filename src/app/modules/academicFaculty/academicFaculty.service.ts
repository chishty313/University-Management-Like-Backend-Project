import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicDepartmentSearchableFields } from '../academicDepartment/academicDepartment.constant';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  return await AcademicFaculty.create(payload);
};

const getAllAcademicFacultiesFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
  return await AcademicFaculty.findById(facultyId);
};

const updateAcademicFacultyIntoDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const updatedAcademicFaculty = await AcademicFaculty.findOneAndUpdate(
    { _id: facultyId },
    payload,
    {
      new: true,
    },
  );
  return updatedAcademicFaculty;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
