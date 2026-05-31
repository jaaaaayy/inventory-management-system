import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
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
      trim: true,
      unique: true,
    },
    username: {
      required: true,
      type: String,
      minlength: 6,
      maxlength: 30,
      trim: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      minlength: 8,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
