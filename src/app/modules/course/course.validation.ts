import { z } from 'zod';

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean(),
    preRequisiteCourses: z.array(preRequisiteCoursesValidationSchema),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
};
