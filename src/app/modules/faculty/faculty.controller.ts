import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const getAllFacultiesResult = await FacultyServices.getAllFacultiesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrived successfully',
    data: getAllFacultiesResult,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const getSingleFacultyResult = await FacultyServices.getSingleFacultyFromDB(
    req.params.facultyId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SIngle Faculty is retrived successfully',
    data: getSingleFacultyResult,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const updateFacultyResult = await FacultyServices.updateFacultyIntoDB(
    req.params.facultyId,
    req.body.faculty,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated successfully',
    data: updateFacultyResult,
  });
});

const deletedFaculty = catchAsync(async (req, res) => {
  const deletedFacultyResult = await FacultyServices.deleteFacultyFromDB(
    req.params.facultyId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted successfully',
    data: deletedFacultyResult,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deletedFaculty,
};
