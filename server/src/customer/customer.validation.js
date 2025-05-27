import { commonUserInfoValidationSchema } from "../auth/auth.validation.js";

export const addressValidationSchema = {
  "address.addressLine1": {
    notEmpty: {
      errorMessage: "Address line 1 is required.",
    },
    isString: {
      errorMessage: "Address line 1 must be a string.",
    },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: "Address line 1 must be at most 50 characters long.",
    },
  },
  "address.addressLine2": {
    isString: {
      errorMessage: "Address line 2 must be a string.",
    },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: "Address line 2 must be at most 50 characters long.",
    },
  },
  "address.city": {
    notEmpty: {
      errorMessage: "City is required.",
    },
    isString: {
      errorMessage: "City must be a string.",
    },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: "City must be at most 50 characters long.",
    },
  },
  "address.province": {
    notEmpty: {
      errorMessage: "Province is required.",
    },
    isString: {
      errorMessage: "Province must be a string.",
    },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: "Province must be at most 50 characters long.",
    },
  },
  "address.postalCode": {
    notEmpty: {
      errorMessage: "Postal code is required.",
    },
    isString: {
      errorMessage: "Postal code must be a string.",
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Postal code must be between 3 and 10 characters long.",
    },
  },
};

const customerValidationSchema = {
  ...{
    firstName: commonUserInfoValidationSchema.firstName,
    lastName: commonUserInfoValidationSchema.lastName,
    email: commonUserInfoValidationSchema.email,
    mobileNumber: commonUserInfoValidationSchema.mobileNumber,
  },
  ...addressValidationSchema,
};

export default customerValidationSchema;
