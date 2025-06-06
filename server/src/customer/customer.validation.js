import {
  addressValidationSchema,
  commonUserInfoValidationSchema,
} from "../shared/validators.js";

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
