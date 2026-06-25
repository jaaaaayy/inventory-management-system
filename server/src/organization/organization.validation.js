export const organizationUpdateValidationSchema = {
  name: {
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
};
