export const purchaseOrderValidationSchema = {
  vendor: {
    notEmpty: {
      errorMessage: "Vendor id is required.",
    },
    isMongoId: {
      errorMessage: "Vendor must be a valid MongoDB ObjectId.",
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
  expectedDate: {
    notEmpty: {
      errorMessage: "Expected date is required.",
    },
    isISO8601: {
      errorMessage: "Expected date must be a valid ISO8601 date.",
    },
  },
  status: {
    optional: true,
    isIn: {
      options: [["Pending", "Received", "Cancelled"]],
      errorMessage:
        "Status must be one of 'Pending', 'Received', or 'Cancelled'.",
    },
  },
};

export const purchaseOrderStatusValidationSchema = {
  status: {
    notEmpty: {
      errorMessage: "Status is required.",
    },
    isIn: {
      options: [["Pending", "Received", "Cancelled"]],
      errorMessage:
        "Status must be one of 'Pending', 'Received', or 'Cancelled'.",
    },
  },
};
