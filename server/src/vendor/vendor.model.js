import mongoose from "mongoose";

const vendorsSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    name: {
      required: true,
      type: String,
      trim: true,
      maxlength: 50,
    },
    email: {
      required: true,
      type: String,
      trim: true,
    },
    mobileNumber: {
      required: true,
      type: String,
      minlength: 10,
      maxlength: 15,
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

vendorsSchema.index({ organization: 1, email: 1 }, { unique: true });
vendorsSchema.index({ organization: 1, mobileNumber: 1 }, { unique: true });

const Vendors = mongoose.model("Vendor", vendorsSchema, "vendors");
export default Vendors;
