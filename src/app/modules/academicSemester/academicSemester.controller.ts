import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const allFetchedAcademicSemestersResult =
    await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic semesters are fetched successfully',
    data: allFetchedAcademicSemestersResult,
  });
});

const getSingleAcademicSemestersById = catchAsync(async (req, res) => {
  const fetchedSingleAcademicSemestersResult =
    await AcademicSemesterServices.getSingleAcademicSemesterByIdFromDB(
      req.params.semesterId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic semesters are fetched successfully',
    data: fetchedSingleAcademicSemestersResult,
  });
});

const updateSingleAcademicSemesterPartialInfo = catchAsync(async (req, res) => {
  const updatedSingleAcademicSemesterPartialInfoResult =
    await AcademicSemesterServices.updateSingleAcademicSemesterPartialInfoIntoDB(
      req.params.semesterId,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patch updated successfully',
    data: updatedSingleAcademicSemesterPartialInfoResult,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemestersById,
  updateSingleAcademicSemesterPartialInfo,
};
