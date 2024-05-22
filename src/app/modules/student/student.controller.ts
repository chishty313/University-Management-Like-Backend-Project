import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import StudentValidationSchema from './student.joi.validation';
// import { z } from 'zod';
import StudentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // Creating a schema validation using zod
    const { student: studentData } = req.body;

    const zodParsedData = StudentValidationSchema.parse(studentData);

    // // data validation using joi
    // const { error, value } = StudentValidationSchema.validate(studentData);

    //   Will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // console.log({ error }, { value });

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    // Send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      err: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students data retrived successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      err: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentID);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      err: error,
    });
    console.log(error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentID);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
