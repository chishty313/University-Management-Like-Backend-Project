import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
  const getAllAdminsResult = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrived successfully',
    meta: getAllAdminsResult.meta,
    data: getAllAdminsResult.result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const getSingleAdminResult = await AdminServices.getSingleAdminFromDB(
    req.params.adminId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrived successfully',
    data: getSingleAdminResult,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const updateAdminResult = await AdminServices.updateAdminIntoDB(
    req.params.adminId,
    req.body.admin,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: updateAdminResult,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const deleteAdminResult = await AdminServices.deleteAdminFromDB(
    req.params.adminId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: deleteAdminResult,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
