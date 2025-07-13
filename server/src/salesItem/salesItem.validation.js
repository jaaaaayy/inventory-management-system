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
    isDecimal: {
      options: { decimal_digits: "0,2" },
      errorMessage: "Quantity must be a decimal with up to 2 decimal places.",
    },
  },
  "items.*.totalPrice": {
    optional: true,
    isDecimal: {
      options: { decimal_digits: "0,2" },
      errorMessage:
        "Total price must be a decimal with up to 2 decimal places.",
    },
  },
};
