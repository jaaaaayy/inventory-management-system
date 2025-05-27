const productValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Product name is required.",
    },
    isString: {
      errorMessage: "Product name must be a string.",
    },
    isLength: {
      options: { max: 100 },
      errorMessage: "Product name must be at most 100 characters long.",
    },
  },
  stockKeepingUnit: {
    notEmpty: {
      errorMessage: "Stock keeping unit is required.",
    },
    isString: {
      errorMessage: "Stock keeping unit must be a string.",
    },
    isLength: {
      options: { max: 50 },
      errorMessage: "Stock keeping unit must be at most 50 characters long.",
    },
  },
  costPrice: {
    notEmpty: {
      errorMessage: "Cost price is required.",
    },
    isFloat: {
      errorMessage: "Cost price must be a decimal.",
    },
  },
  sellingPrice: {
    notEmpty: {
      errorMessage: "Selling price is required.",
    },
    isFloat: {
      errorMessage: "Selling price must be a decimal.",
    },
  },
  unit: {
    notEmpty: {
      errorMessage: "Unit is required.",
    },
    isString: {
      errorMessage: "Unit must be a string.",
    },
  },
  category: {
    notEmpty: {
      errorMessage: "Category id is required.",
    },
    isMongoId: {
      errorMessage: "Category must be a valid MongoDB ObjectId.",
    },
  },
  vendor: {
    notEmpty: {
      errorMessage: "Vendor id is required.",
    },
    isMongoId: {
      errorMessage: "Vendor must be a valid MongoDB ObjectId.",
    },
  },
};

export default productValidationSchema;
