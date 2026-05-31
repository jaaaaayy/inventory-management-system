import { validationResult } from "express-validator";
import User from "../user/user.model.js";

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
      organization: request.session.user.organizationId,
      status: "Active",
    }).populate("organization");

    if (!user || !user.organization || user.organization.status !== "Active") {
      return response.status(401).json({ message: "Unauthenticated." });
    }

    request.userId = request.session.user.id;
    request.organizationId = user.organization._id;
    request.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to authenticate. Please try again.",
    });
  }
};
