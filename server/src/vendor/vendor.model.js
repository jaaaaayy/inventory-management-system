import mongoose from "mongoose";

const vendorsSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trime: true,
    },
    email: {
      required: true,
      type: String,
      trim: true,
      unique: true,
    },
    mobileNumber: {
      required: true,
      type: String,
      minlength: 10,
      maxlength: 15,
      unique: true,
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
  },
  { timestamps: true }
);

const Vendors = mongoose.model("vendors", vendorsSchema);
export default Vendors;
