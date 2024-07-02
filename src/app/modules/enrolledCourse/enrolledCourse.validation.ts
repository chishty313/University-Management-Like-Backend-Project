import { z } from 'zod';

const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    offeredCourse: z.string(),
    course: z.string(),
    student: z.string(),
    faculty: z.string(),
  }),
});

const updateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string().optional(),
    offeredCourse: z.string().optional(),
    student: z.string().optional(),
    faculty: z.string().optional(),
    courseMarks: z.object({
      classTest1: z.number().optional(),
      midTerm: z.number().optional(),
      classTest2: z.number().optional(),
      finalTerm: z.number().optional(),
    }),
  }),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationSchema,
  updateEnrolledCourseValidationSchema,
};
