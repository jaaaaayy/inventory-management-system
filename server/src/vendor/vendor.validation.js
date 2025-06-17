import {
  addressValidationSchema,
  commonUserInfoValidationSchema,
} from "../shared/validators.js";

const vendorValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required.",
    },
    isString: {
      errorMessage: "Name must be a string.",
    },
    isLength: {
      options: { max: 50 },
      errorMessage: "Name must be at most 50 characters long.",
    },
  },
  ...{
    email: commonUserInfoValidationSchema.email,
    mobileNumber: commonUserInfoValidationSchema.mobileNumber,
  },
  ...addressValidationSchema,
};

export default vendorValidationSchema;
