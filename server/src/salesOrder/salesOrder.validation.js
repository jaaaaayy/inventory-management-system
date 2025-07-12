export const salesOrderValidationSchema = {
  customer: {
    notEmpty: {
      errorMessage: "Customer id is required.",
    },
    isMongoId: {
      errorMessage: "Customer must be a valid MongoDB ObjectId.",
    },
  },
  deliveryDate: {
    optional: true,
    isISO8601: {
      errorMessage: "Delivery date must be a valid ISO8601 date.",
    },
  },
  status: {
    optional: true,
    isIn: {
      options: [["Pending", "Shipped", "Delivered", "Cancelled"]],
      errorMessage:
        "Status must be one of 'Pending', 'Shipped', 'Delivered', or 'Cancelled'.",
    },
  },
  totalAmount: {
    optional: true,
    isFloat: {
      errorMessage: "Total amount must be a valid float.",
      options: { min: 0 },
    },
  },
};
