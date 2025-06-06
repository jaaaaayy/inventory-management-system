export const commonUserInfoValidationSchema = {
  firstName: {
    notEmpty: {
      errorMessage: "First name is required.",
    },
    isString: {
      errorMessage: "First name must be a string.",
    },
    isLength: {
      options: { max: 50 },
      errorMessage: "First name must be at most 50 characters long.",
    },
    trim: true,
  },
  lastName: {
    notEmpty: {
      errorMessage: "Last name is required.",
    },
    isString: {
      errorMessage: "Last name must be a string.",
    },
    isLength: {
      options: { max: 50 },
      errorMessage: "Last name must be at most 50 characters long.",
    },
    trim: true,
  },
  email: {
    notEmpty: {
      errorMessage: "Email is required.",
    },
    isString: {
      errorMessage: "Email must be a string.",
    },
    trim: true,
  },
  mobileNumber: {
    notEmpty: {
      errorMessage: "Mobile number is required.",
    },
    isString: {
      errorMessage: "Mobile number must be a string.",
    },
    trim: true,
    isLength: {
      options: { min: 10, max: 15 },
      errorMessage: "Mobile number must be between 10 and 15 characters long.",
    },
    matches: {
      options: /^(?:\+63|63|0)9\d{9}$/,
      errorMessage: "Invalid mobile number.",
    },
  },
};

export const addressValidationSchema = {
  "address.addressLine1": {
    notEmpty: {
      errorMessage: "Address line 1 is required.",
    },
    isString: {
      errorMessage: "Address line 1 must be a string.",
    },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: "Address line 1 must be at most 50 characters long.",
    },
  },
  "address.addressLine2": {
    isString: {
      errorMessage: "Address line 2 must be a string.",
    },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: "Address line 2 must be at most 50 characters long.",
    },
  },
  "address.city": {
    notEmpty: {
      errorMessage: "City is required.",
    },
    isString: {
      errorMessage: "City must be a string.",
    },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: "City must be at most 50 characters long.",
    },
  },
  "address.province": {
    notEmpty: {
      errorMessage: "Province is required.",
    },
    isString: {
      errorMessage: "Province must be a string.",
    },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: "Province must be at most 50 characters long.",
    },
  },
  "address.postalCode": {
    notEmpty: {
      errorMessage: "Postal code is required.",
    },
    isString: {
      errorMessage: "Postal code must be a string.",
    },
    trim: true,
    isLength: {
      options: { min: 3, max: 10 },
      errorMessage: "Postal code must be between 3 and 10 characters long.",
    },
  },
};
