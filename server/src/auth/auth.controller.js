import bcrypt from "bcrypt";
import User from "../user/user.model.js";
import { withTransaction } from "../config/database.js";
import Organization from "../organization/organization.model.js";

const buildAuthUser = ({ user, organization }) => ({
  name: user.firstName + " " + user.lastName,
  email: user.email,
  organization: {
    id: organization._id,
    name: organization.name,
  },
});

const storeSessionUser = (request, { user, organization }) => {
  request.session.user = {
    id: user._id,
    organizationId: organization._id,
  };
};

const regenerateSession = (request) =>
  new Promise((resolve, reject) => {
    request.session.regenerate((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

const saveSession = (request) =>
  new Promise((resolve, reject) => {
    request.session.save((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

const establishSession = async (request, result) => {
  await regenerateSession(request);
  storeSessionUser(request, result);
  await saveSession(request);
};

export const register = async (request, response) => {
  try {
    const {
      organizationName,
      firstName,
      lastName,
      email,
      mobileNumber,
      username,
      password,
    } = request.body;
    const errors = {};

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      errors.email = "Email is already in use.";
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      errors.username = "Username is already taken.";
    }

    const existingMobileNumber = await User.findOne({ mobileNumber });
    if (existingMobileNumber) {
      errors.mobileNumber = "Mobile number is already in use.";
    }

    if (Object.keys(errors).length > 0) {
      return response
        .status(400)
        .json({ message: "Validation failed.", errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await withTransaction(async (session) => {
      const organization = new Organization({
        name: organizationName,
      });
      await organization.save({ session });

      const newUser = new User({
        organization: organization._id,
        firstName,
        lastName,
        email,
        mobileNumber,
        username,
        password: hashedPassword,
        lastLogin: new Date(),
      });
      await newUser.save({ session });

      return {
        user: newUser,
        organization,
      };
    });

    await establishSession(request, result);

    response.status(201).json({
      message: "Registered successfully.",
      user: buildAuthUser(result),
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to register. Please try again.",
    });
  }
};

export const login = async (request, response) => {
  try {
    const { username, password } = request.body;

    const findUser = await User.findOne({ username });

    if (!findUser || !(await bcrypt.compare(password, findUser.password))) {
      return response
        .status(400)
        .json({ message: "Invalid username or password." });
    }

    if (findUser.status === "Inactive") {
      return response.status(403).json({
        message: "Your account is inactive. Please contact an administrator.",
      });
    }

    const user = await User.findByIdAndUpdate(
      findUser._id,
      { lastLogin: new Date() },
      { new: true }
    ).populate("organization");

    if (!user.organization || user.organization.status !== "Active") {
      return response.status(403).json({
        message: "No active organization found.",
      });
    }

    const result = {
      user,
      organization: user.organization,
    };

    await establishSession(request, result);

    response.json({
      message: "Logged in successfully.",
      user: buildAuthUser(result),
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to login. Please try again.",
    });
  }
};

export const authStatus = async (request, response) => {
  try {
    if (!request.session?.user?.id || !request.session?.user?.organizationId) {
      return response.json({ loggedIn: false });
    }

    const user = await User.findOne({
      _id: request.session.user.id,
      organization: request.session.user.organizationId,
      status: "Active",
    }).populate("organization");

    if (!user || !user.organization || user.organization.status !== "Active") {
      return response.json({ loggedIn: false });
    }

    response.json({ loggedIn: true });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to check authentication status. Please try again.",
    });
  }
};

export const logout = (request, response) => {
  request.session.destroy((error) => {
    if (error) {
      console.log(error);
      return response.status(500).json({
        message: "Failed to logout. Please try again.",
      });
    }

    response.json({ message: "Logged out successfully." });
  });
};
