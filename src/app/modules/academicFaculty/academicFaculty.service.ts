import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  return await AcademicFaculty.create(payload);
};

const getAllAcademicFacultiesFromDB = async () => {
  return await AcademicFaculty.find();
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
