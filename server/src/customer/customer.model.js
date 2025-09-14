import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      required: true,
      type: String,
      maxlength: 50,
      trim: true,
    },
    lastName: {
      required: true,
      type: String,
      maxlength: 50,
      trim: true,
    },
    address: {
      addressLine1: {
        required: true,
        type: String,
        maxlength: 50,
        trim: true,
      },
      addressLine2: {
        type: String,
        maxlength: 50,
        trim: true,
      },
      city: {
        required: true,
        type: String,
        maxlength: 50,
        trim: true,
      },
      province: {
        required: true,
        type: String,
        maxlength: 50,
        trim: true,
      },
      postalCode: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 10,
        trim: true,
      },
    },
    mobileNumber: {
      required: true,
      type: String,
      minlength: 10,
      maxlength: 15,
      trim: true,
      unique: true,
    },
    email: {
      required: true,
      type: String,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
