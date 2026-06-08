const productValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required.",
    },
    isString: {
      errorMessage: "Name must be a string.",
    },
    isLength: {
      options: { max: 100 },
      errorMessage: "Name must be at most 100 characters long.",
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
  description: {
    optional: true,
    isString: {
      errorMessage: "Description must be a string.",
    },
    isLength: {
      options: { max: 500 },
      errorMessage: "Description must be at most 500 characters long.",
    },
  },
  costPrice: {
    notEmpty: {
      errorMessage: "Cost price is required.",
    },
    isDecimal: {
      options: { decimal_digits: "0,2" },
      errorMessage: "Cost price must be a decimal with up to 2 decimal places.",
    },
  },
  sellingPrice: {
    notEmpty: {
      errorMessage: "Selling price is required.",
    },
    isDecimal: {
      options: { decimal_digits: "0,2" },
      errorMessage:
        "Selling price must be a decimal with up to 2 decimal places.",
    },
  },
  unit: {
    notEmpty: {
      errorMessage: "Unit is required.",
    },
    isString: {
      errorMessage: "Unit must be a string.",
    },
    isLength: {
      options: { max: 10 },
      errorMessage: "Unit must be at most 10 characters long.",
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
  image: {
    custom: {
      options: (_value, { req }) => {
        if (req.fileValidationError) {
          throw new Error(req.fileValidationError);
        }
        
        if (!req.file) {
          throw new Error("Image is required.");
        }
        return true;
      },
    },
  },
};

export const productUpdateValidationSchema = {
  name: productValidationSchema.name,
  stockKeepingUnit: productValidationSchema.stockKeepingUnit,
  description: productValidationSchema.description,
  costPrice: productValidationSchema.costPrice,
  sellingPrice: productValidationSchema.sellingPrice,
  unit: productValidationSchema.unit,
  category: productValidationSchema.category,
  vendor: productValidationSchema.vendor,
  image: {
    custom: {
      options: (_value, { req }) => {
        if (req.fileValidationError) {
          throw new Error(req.fileValidationError);
        }
        return true;
      },
    },
  },
};

export default productValidationSchema;
