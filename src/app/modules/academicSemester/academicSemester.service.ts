import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code !!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  return await AcademicSemester.find();
};

const getSingleAcademicSemesterByIdFromDB = async (semesterId: string) => {
  return await AcademicSemester.findById(semesterId);
};

const updateSingleAcademicSemesterPartialInfoIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid semester code !!');
  }
  return await AcademicSemester.findOneAndUpdate({ _id: semesterId }, payload, {
    new: true,
  });
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterByIdFromDB,
  updateSingleAcademicSemesterPartialInfoIntoDB,
};
