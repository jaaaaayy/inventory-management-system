export const loginValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username is required.",
    },
    isString: {
      errorMessage: "Username must be a string.",
    },
    isLength: {
      options: { min: 6, max: 30 },
      errorMessage: "Username must be between 6 and 30 characters long.",
    },
    trim: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required.",
    },
    isString: {
      errorMessage: "Password must be a string.",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Username must be at least 8 characters long.",
    },
    trim: true,
  },
};

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

export const registerValidationSchema = {
  ...{
    firstName: commonUserInfoValidationSchema.firstName,
    lastName: commonUserInfoValidationSchema.lastName,
    email: commonUserInfoValidationSchema.email,
    mobileNumber: commonUserInfoValidationSchema.mobileNumber,
    username: loginValidationSchema.username,
    password: loginValidationSchema.password,
  },
  role: {
    optional: true,
    isString: {
      errorMessage: "Role must be a string.",
    },
    isIn: {
      options: [["Admin", "User"]],
      errorMessage: "Role must be either 'Admin' or 'User'.",
    },
  },
  status: {
    optional: true,
    isString: {
      errorMessage: "Status must be a string.",
    },
    isIn: {
      options: [["Active", "Inactive"]],
      errorMessage: "Status must be either 'Active' or 'Inactive'.",
    },
  },
};
