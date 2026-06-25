import bcrypt from "bcrypt";
import User from "../user/user.model.js";
import { withTransaction } from "../config/database.js";
import Organization from "../organization/organization.model.js";
import OrganizationMember from "../organizationMember/organizationMember.model.js";
import Position from "../position/position.model.js";
import { POSITION_NAMES } from "../config/seedRbac.js";

export const buildAuthUser = ({ user, organization, position }) => ({
  name: user.firstName + " " + user.lastName,
  email: user.email,
  platformRole: user.platformRole,
  position: position.name,
  permissions: position.permissions,
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

export const establishSession = async (request, result) => {
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

    const ownerPosition = await Position.findOne({ name: POSITION_NAMES.OWNER });
    if (!ownerPosition) {
      return response.status(500).json({
        message: "Positions are not configured. Please try again later.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await withTransaction(async (session) => {
      const organization = new Organization({
        name: organizationName,
      });
      await organization.save({ session });

      const newUser = new User({
        firstName,
        lastName,
        email,
        mobileNumber,
        username,
        password: hashedPassword,
        platformRole: "user",
        lastLogin: new Date(),
      });
      await newUser.save({ session });

      const membership = new OrganizationMember({
        organization: organization._id,
        user: newUser._id,
        position: ownerPosition._id,
        status: "Active",
      });
      await membership.save({ session });

      return {
        user: newUser,
        organization,
        position: ownerPosition,
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

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return response
        .status(400)
        .json({ message: "Invalid username or password." });
    }

    if (user.status === "Inactive") {
      return response.status(403).json({
        message: "Your account is inactive. Please contact an administrator.",
      });
    }

    const memberships = await OrganizationMember.find({
      user: user._id,
      status: "Active",
    })
      .sort({ updatedAt: -1 })
      .populate("organization")
      .populate("position");

    const membership = memberships.find(
      (item) =>
        item.organization &&
        item.organization.status === "Active" &&
        item.position
    );

    if (!membership) {
      return response.status(403).json({
        message: "No active organization found.",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const result = {
      user,
      organization: membership.organization,
      position: membership.position,
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
      status: "Active",
    });

    if (!user) {
      return response.json({ loggedIn: false });
    }

    const membership = await OrganizationMember.findOne({
      user: user._id,
      organization: request.session.user.organizationId,
      status: "Active",
    }).populate("organization");

    if (
      !membership ||
      !membership.organization ||
      membership.organization.status !== "Active"
    ) {
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

export const me = async (request, response) => {
  try {
    response.json({
      user: buildAuthUser({
        user: request.user,
        organization: request.member.organization,
        position: request.member.position,
      }),
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to load account. Please try again.",
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
