import { commonUserInfoValidationSchema } from "../shared/validators.js";

export const loginValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username is required.",
    },
    isString: {
      errorMessage: "Username must be a string.",
    },
    isLength: {
      options: { min: 6, max: 30 },
      errorMessage: "Username must be between 6 and 30 characters long.",
    },
    trim: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required.",
    },
    isString: {
      errorMessage: "Password must be a string.",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Username must be at least 8 characters long.",
    },
    trim: true,
  },
};

export const registerValidationSchema = {
  organizationName: {
    notEmpty: {
      errorMessage: "Organization name is required.",
    },
    isString: {
      errorMessage: "Organization name must be a string.",
    },
    isLength: {
      options: { max: 100 },
      errorMessage: "Organization name must be at most 100 characters long.",
    },
    trim: true,
  },
  firstName: commonUserInfoValidationSchema.firstName,
  lastName: commonUserInfoValidationSchema.lastName,
  email: commonUserInfoValidationSchema.email,
  mobileNumber: commonUserInfoValidationSchema.mobileNumber,
  username: loginValidationSchema.username,
  password: loginValidationSchema.password,
};
