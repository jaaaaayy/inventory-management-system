import { validationResult } from "express-validator";
import User from "../user/user.model.js";
import OrganizationMember from "../organizationMember/organizationMember.model.js";

export const validate = () => (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    const errors = result.array().reduce((fieldErrors, error) => {
      fieldErrors[error.path] = error.msg;
      return fieldErrors;
    }, {});

    return response.status(400).json({
      message: "Validation failed.",
      errors,
    });
  }
  next();
};

export const isAuthenticated = async (request, response, next) => {
  try {
    if (!request.session?.user?.id || !request.session?.user?.organizationId) {
      return response.status(401).json({ message: "Unauthenticated." });
    }

    const user = await User.findOne({
      _id: request.session.user.id,
      status: "Active",
    });

    if (!user) {
      return response.status(401).json({ message: "Unauthenticated." });
    }

    const membership = await OrganizationMember.findOne({
      user: user._id,
      organization: request.session.user.organizationId,
      status: "Active",
    })
      .populate("organization")
      .populate("position");

    if (
      !membership ||
      !membership.organization ||
      membership.organization.status !== "Active" ||
      !membership.position
    ) {
      return response.status(401).json({ message: "Unauthenticated." });
    }

    request.userId = user._id;
    request.user = user;
    request.organizationId = membership.organization._id;
    request.member = membership;
    request.permissions = new Set(membership.position.permissions);

    next();
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to authenticate. Please try again.",
    });
  }
};

export const requirePermission =
  (...keys) =>
  (request, response, next) => {
    const permissions = request.permissions;

    if (!permissions || !keys.every((key) => permissions.has(key))) {
      return response.status(403).json({
        message: "You do not have permission to perform this action.",
      });
    }

    next();
  };
