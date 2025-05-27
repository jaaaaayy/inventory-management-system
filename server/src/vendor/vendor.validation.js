import { commonUserInfoValidationSchema } from "../auth/auth.validation.js";
import { addressValidationSchema } from "../customer/customer.validation.js";

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
};

export default vendorValidationSchema;
