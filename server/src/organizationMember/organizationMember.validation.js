import { POSITION_NAMES } from "../config/seedRbac.js";

const ASSIGNABLE_POSITIONS = [POSITION_NAMES.ADMIN, POSITION_NAMES.MEMBER];

export const memberUpdateValidationSchema = {
  position: {
    optional: true,
    isString: {
      errorMessage: "Position must be a string.",
    },
    isIn: {
      options: [ASSIGNABLE_POSITIONS],
      errorMessage: "Invalid position.",
    },
    trim: true,
  },
  status: {
    optional: true,
    isIn: {
      options: [["Active", "Inactive"]],
      errorMessage: "Invalid status.",
    },
    trim: true,
  },
};
