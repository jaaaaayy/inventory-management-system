import mongoose from "mongoose";

const organizationMemberSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

organizationMemberSchema.index({ organization: 1, user: 1 }, { unique: true });
organizationMemberSchema.index({ user: 1, status: 1 });

const OrganizationMember = mongoose.model(
  "OrganizationMember",
  organizationMemberSchema
);
export default OrganizationMember;
