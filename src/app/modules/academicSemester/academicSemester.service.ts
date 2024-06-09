import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code
  if (
    academicSemesterNameCodeMapper[payload.name] !==
    academicSemesterNameCodeMapper[payload.code]
  ) {
    throw new Error('Invalid semester code !!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
