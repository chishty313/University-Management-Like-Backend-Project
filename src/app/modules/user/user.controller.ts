import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Creating a schema validation using zod
    const { password, student: studentData } = req.body;

    // const zodParsedData = StudentValidationSchema.parse(studentData);

    // // data validation using joi
    // const { error, value } = StudentValidationSchema.validate(studentData);

    //   Will call service function to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // Send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
