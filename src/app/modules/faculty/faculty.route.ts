import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties,
);

router.get(
  '/:facultyId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:facultyId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:facultyId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FacultyControllers.deletedFaculty,
);

export const FacultyRoutes = router;
