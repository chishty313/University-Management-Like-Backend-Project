import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const createdAcademicDepartmentResult =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully !!!',
    data: createdAcademicDepartmentResult,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const getAllAcademicDepartmentsResult =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic departments are fetched successfully !!!',
    data: getAllAcademicDepartmentsResult,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const getSingleAcademicDepartmentResult =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      req.params.departmentId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single academic departmnent is fetched successfully !!!',
    data: getSingleAcademicDepartmentResult,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const updateAcademicDepartmentResult =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      req.params.departmentId,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic departmnent is updated successfully !!!',
    data: updateAcademicDepartmentResult,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
