import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const createdAcademicFacultyResult =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created successfully !!!',
    data: createdAcademicFacultyResult,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const getAllAcademicFacultiesResult =
    await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic faculty is fetched successfully !!!',
    meta: getAllAcademicFacultiesResult.meta,
    data: getAllAcademicFacultiesResult.result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const getSingleAcademicFacultyResult =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(
      req.params.facultyId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single academic faculty is fetched successfully !!!',
    data: getSingleAcademicFacultyResult,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const updateAcademicFacultyResult =
    await AcademicFacultyServices.updateAcademicFacultyIntoDB(
      req.params.facultyId,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single academic faculty is updated successfully !!!',
    data: updateAcademicFacultyResult,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
