export const salesItemValidationSchema = {
  items: {
    notEmpty: {
      errorMessage: "At least one item is required.",
    },
    isArray: {
      errorMessage: "Items must be an array of order items.",
    },
  },
  "items.*.product": {
    notEmpty: {
      errorMessage: "Product id is required.",
    },
    isMongoId: {
      errorMessage: "Product id must be a valid MongoDB ObjectId.",
    },
  },
  "items.*.quantity": {
    notEmpty: {
      errorMessage: "Quantity is required.",
    },
    isFloat: {
      errorMessage: "Customer must be a float.",
    },
  },
};
