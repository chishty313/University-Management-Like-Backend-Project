import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const createSemesterRegistrationResult =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is created successfully',
    data: createSemesterRegistrationResult,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const getAllSemesterRegistrationsResult =
    await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is retrived successfully',
    data: getAllSemesterRegistrationsResult,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const getSingleSemesterRegistrationResult =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
      req.params.semesterId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single semester registration is retrived successfully',
    data: getSingleSemesterRegistrationResult,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const updateSemesterRegistrationResult =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      req.params.semesterId,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration is updated successfully',
    data: updateSemesterRegistrationResult,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
