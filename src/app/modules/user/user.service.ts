import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // If password is not given, use default password
  userData.password = password || (config.default_Password as string);
  // This is the explanation of the above user.password code
  // if (!password) {
  //   user.password = config.default_Password as string;
  // } else {
  //   user.password = password;
  // }

  // Set student role
  userData.role = 'student';

  // Set manually generated ID
  userData.id = '2030100001';

  // create a user
  const newUser = await User.create(userData); // Built in static method

  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // Reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
