import {
  addressValidationSchema,
  commonUserInfoValidationSchema,
} from "../shared/validators.js";

const vendorValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Vendor name is required.",
    },
    isString: {
      errorMessage: "Vendor name must be a string.",
    },
    isLength: {
      options: { max: 50 },
      errorMessage: "Vendor name must be at most 50 characters long.",
    },
  },
  ...{
    email: commonUserInfoValidationSchema.email,
    mobileNumber: commonUserInfoValidationSchema.mobileNumber,
  },
  ...addressValidationSchema,
  user: {
    notEmpty: {
      errorMessage: "User id is required.",
    },
    isMongoId: {
      errorMessage: "User must be a valid MongoDB ObjectId.",
    },
  },
};

export default vendorValidationSchema;
