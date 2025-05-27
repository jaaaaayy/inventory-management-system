import { validationResult } from "express-validator";

export const validate = () => (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response.status(400).json({ errors: result.array() });
  }
  next();
};

export const isAuthenticated = (request, response, next) => {
  request.sessionStore.get(request.sessionID, (error, session) => {
    if (error || !session) {
      return response.status(401).json({ message: "Unauthenticated." });
    }

    next();
  });
};

export const checkPermissions = (permissions) => {
  return (request, response, next) => {
    const userRole = request.session.user.role;
    if (userRole && permissions.includes(userRole)) {
      return next();
    }

    return response.status(403).json("You don't have permission.");
  };
};
