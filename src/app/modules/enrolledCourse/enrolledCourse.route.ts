import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  auth('student'),
  EnrolledCourseControllers.enrolledCourse,
);

export const EnrolledCourseRoutes = router;
