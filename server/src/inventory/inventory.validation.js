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

export default inventoryValidationSchema;
