import Joi from 'joi';
import {
  TUserName,
  TGuardian,
  TLocalGuardian,
  TStudent,
} from './student.interface';

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (value: string) => {
  const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
  if (firstNameStr !== value) {
    throw new Error(`${value} is not in capitalized format`);
  }
  return value;
};

// Joi schema for UserName
const UserNameValidationSchema = Joi.object<TUserName>({
  firstName: Joi.string()
    .max(20)
    .trim()
    .custom(capitalizeFirstLetter, 'capitalize validation')
    .required()
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name can not be more than 20 characters',
      'any.required': 'First name is required',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.pattern.base': '{#label} is not valid',
      'any.required': 'Last name is required',
    }),
});

// Joi schema for Guardian
const GuardianValidationSchema = Joi.object<TGuardian>({
  fatherName: Joi.string().trim().required().messages({
    'string.base': 'Father name must be a string',
    'string.empty': 'Father name is required',
    'any.required': 'Father name is required',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Father Occupation must be a string',
    'string.empty': 'Father Occupation is required',
    'any.required': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.base': 'Father Contact no must be a string',
    'string.empty': 'Father Contact no is required',
    'any.required': 'Father Contact no is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.base': 'Mother name must be a string',
    'string.empty': 'Mother name is required',
    'any.required': 'Mother name is required',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'string.empty': 'Mother Occupation is required',
    'any.required': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.base': 'Mother Contact no must be a string',
    'string.empty': 'Mother Contact no is required',
    'any.required': 'Mother Contact no is required',
  }),
});

// Joi schema for LocalGuardian
const LocalGuardianValidationSchema = Joi.object<TLocalGuardian>({
  name: Joi.string().trim().required().messages({
    'string.base': 'Local guardian name must be a string',
    'string.empty': 'Local guardian name is required',
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.base': 'Local guardian Occupation must be a string',
    'string.empty': 'Local guardian Occupation is required',
    'any.required': 'Local guardian Occupation is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.base': 'Local guardian Contact no must be a string',
    'string.empty': 'Local guardian Contact no is required',
    'any.required': 'Local guardian Contact no is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.base': 'Local guardian Address must be a string',
    'string.empty': 'Local guardian Address is required',
    'any.required': 'Local guardian Address is required',
  }),
});

// Joi schema for Student
const StudentValidationSchema = Joi.object<TStudent>({
  id: Joi.string().trim().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
    'any.required': 'ID is required',
  }),
  name: UserNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender must be a string',
    'any.only': '{#value} is not valid',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().trim().optional(),
  email: Joi.string().email().trim().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': '{#value} is not an email',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.base': 'Contact no must be a string',
    'string.empty': 'Contact no is required',
    'any.required': 'Contact no is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.base': 'Emergency Contact no must be a string',
    'string.empty': 'Emergency Contact no is required',
    'any.required': 'Emergency Contact no is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'string.base': 'Blood group must be a string',
      'any.only': '{#value} is not valid',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.base': 'Present Address must be a string',
    'string.empty': 'Present Address is required',
    'any.required': 'Present Address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.base': 'Permanent Address must be a string',
    'string.empty': 'Permanent Address is required',
    'any.required': 'Permanent Address is required',
  }),
  guardian: GuardianValidationSchema.required().messages({
    'any.required': 'Guardian is required',
  }),
  localGuardian: LocalGuardianValidationSchema.required().messages({
    'any.required': 'Local Guardian is required',
  }),
  profileImg: Joi.string().trim().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'string.base': 'Status must be a string',
    'any.only': '{#value} is not valid',
  }),
});

export default StudentValidationSchema;
