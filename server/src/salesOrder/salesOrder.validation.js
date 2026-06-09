export const salesOrderValidationSchema = {
  customer: {
    notEmpty: {
      errorMessage: "Customer id is required.",
    },
    isMongoId: {
      errorMessage: "Customer must be a valid MongoDB ObjectId.",
    },
  },
  orderDate: {
    notEmpty: {
      errorMessage: "Order date is required.",
    },
    isISO8601: {
      errorMessage: "Order date must be a valid ISO8601 date.",
    },
  },
  deliveryDate: {
    notEmpty: {
      errorMessage: "Delivery date is required.",
    },
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
  notes: {
    optional: true,
    isString: {
      errorMessage: "Notes must be a string.",
    },
    isLength: {
      options: { max: 500 },
      errorMessage: "Notes cannot exceed 500 characters.",
    },
    trim: true,
  },
};

export const salesOrderStatusValidationSchema = {
  status: {
    notEmpty: {
      errorMessage: "Status is required.",
    },
    isIn: {
      options: [["Pending", "Shipped", "Delivered", "Cancelled"]],
      errorMessage:
        "Status must be one of 'Pending', 'Shipped', 'Delivered', or 'Cancelled'.",
    },
  },
};
