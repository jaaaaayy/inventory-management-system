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
      options: [["Pending", "Partially Received", "Received", "Cancelled"]],
      errorMessage:
        "Status must be one of 'Pending', 'Partially Received', 'Received', or 'Cancelled'.",
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

export const purchaseOrderStatusValidationSchema = {
  status: {
    notEmpty: {
      errorMessage: "Status is required.",
    },
    isIn: {
      options: [["Pending", "Partially Received", "Received", "Cancelled"]],
      errorMessage:
        "Status must be one of 'Pending', 'Partially Received', 'Received', or 'Cancelled'.",
    },
  },
  items: {
    optional: true,
    isArray: {
      errorMessage: "Items must be an array of received items.",
    },
  },
  "items.*.purchaseItemId": {
    optional: true,
    isMongoId: {
      errorMessage: "Purchase item id must be a valid MongoDB ObjectId.",
    },
  },
  "items.*.quantity": {
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Received quantity must be a positive integer.",
    },
  },
};
