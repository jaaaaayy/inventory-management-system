import { commonUserInfoValidationSchema } from "../shared/validators.js";
import { loginValidationSchema } from "../auth/auth.validation.js";
import { POSITION_NAMES } from "../config/seedRbac.js";

const ASSIGNABLE_POSITIONS = [POSITION_NAMES.ADMIN, POSITION_NAMES.MEMBER];

export const createInvitationValidationSchema = {
  email: commonUserInfoValidationSchema.email,
  position: {
    notEmpty: {
      errorMessage: "Position is required.",
    },
    isString: {
      errorMessage: "Position must be a string.",
    },
    isIn: {
      options: [ASSIGNABLE_POSITIONS],
      errorMessage: "Invalid position.",
    },
    trim: true,
  },
};

export const acceptInvitationValidationSchema = {
  firstName: commonUserInfoValidationSchema.firstName,
  lastName: commonUserInfoValidationSchema.lastName,
  mobileNumber: commonUserInfoValidationSchema.mobileNumber,
  username: loginValidationSchema.username,
  password: loginValidationSchema.password,
};
