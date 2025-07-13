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
  totalAmount: {
    optional: true,
    isDecimal: {
      options: { decimal_digits: "0,2" },
      errorMessage:
        "Total amount must be a decimal with up to 2 decimal places.",
    },
  },
};
