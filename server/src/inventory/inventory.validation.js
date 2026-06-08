const inventoryValidationSchema = {
  quantity: {
    notEmpty: {
      errorMessage: "Quantity is required.",
    },
    isInt: {
      errorMessage: "Quantity must be a number.",
    },
  },
};

export const inventoryAdjustValidationSchema = {
  type: {
    notEmpty: {
      errorMessage: "Adjustment type is required.",
    },
    isIn: {
      options: [["increase", "decrease", "set"]],
      errorMessage: "Type must be one of 'increase', 'decrease', or 'set'.",
    },
  },
  quantity: {
    notEmpty: {
      errorMessage: "Quantity is required.",
    },
    isInt: {
      options: { min: 0 },
      errorMessage: "Quantity must be a non-negative integer.",
    },
  },
  reason: {
    optional: true,
    isString: {
      errorMessage: "Reason must be a string.",
    },
    isLength: {
      options: { max: 500 },
      errorMessage: "Reason must be at most 500 characters long.",
    },
  },
};

export default inventoryValidationSchema;
