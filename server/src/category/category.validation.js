const categoryValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Category is required.",
    },
    isString: {
      errorMessage: "Category must be a string.",
    },
    isLength: {
      options: { max: 50 },
      errorMessage: "Category must be at most 50 characters long.",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "Description is required.",
    },
    isString: {
      errorMessage: "Description must be a string.",
    },
    isLength: {
      options: { max: 200 },
      errorMessage: "Description must be at most 200 characters long.",
    },
  },
};

export default categoryValidationSchema;
