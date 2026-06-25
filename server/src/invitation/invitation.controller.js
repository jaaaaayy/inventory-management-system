import crypto from "node:crypto";
import bcrypt from "bcrypt";
import Invitation from "./invitation.model.js";
import Position from "../position/position.model.js";
import User from "../user/user.model.js";
import OrganizationMember from "../organizationMember/organizationMember.model.js";
import { withTransaction } from "../config/database.js";
import { buildAuthUser, establishSession } from "../auth/auth.controller.js";
import { POSITION_NAMES } from "../config/seedRbac.js";

const INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const createInvitation = async (request, response) => {
  try {
    const { position: positionName } = request.body;
    const email = request.body.email.toLowerCase().trim();

    if (positionName === POSITION_NAMES.OWNER) {
      return response.status(400).json({
        message: "You cannot invite someone as the Owner.",
      });
    }

    const position = await Position.findOne({ name: positionName });
    if (!position) {
      return response.status(400).json({
        message: "Validation failed.",
        errors: { position: "Invalid position." },
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const existingMembership = await OrganizationMember.findOne({
        organization: request.organizationId,
        user: existingUser._id,
      });
      if (existingMembership) {
        return response.status(400).json({
          message: "Validation failed.",
          errors: { email: "This person is already a member." },
        });
      }
    }

    const existingInvite = await Invitation.findOne({
      organization: request.organizationId,
      email,
      status: "Pending",
    });
    if (existingInvite) {
      return response.status(400).json({
        message: "Validation failed.",
        errors: { email: "An invitation is already pending for this email." },
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");

    const invitation = await Invitation.create({
      organization: request.organizationId,
      email,
      position: position._id,
      tokenHash: hashToken(rawToken),
      invitedBy: request.userId,
      expiresAt: new Date(Date.now() + INVITE_TTL_MS),
    });

    const acceptUrl = `${process.env.CLIENT_URL}/accept-invite/${rawToken}`;

    response.status(201).json({
      message: "Invitation created.",
      acceptUrl,
      invitation: {
        _id: invitation._id,
        email: invitation.email,
        position: position.name,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to create invitation. Please try again.",
    });
  }
};

export const getInvitations = async (request, response) => {
  try {
    const invitations = await Invitation.find({
      organization: request.organizationId,
      status: "Pending",
    })
      .populate("position", "name")
      .populate("invitedBy", "firstName lastName")
      .sort({ createdAt: -1 });

    response.json({ invitations });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to get invitations. Please try again.",
    });
  }
};

export const revokeInvitation = async (request, response) => {
  try {
    const invitation = await Invitation.findOneAndUpdate(
      {
        _id: request.params.id,
        organization: request.organizationId,
        status: "Pending",
      },
      { status: "Revoked" },
      { new: true }
    );

    if (!invitation) {
      return response.status(404).json({ message: "Invitation not found." });
    }

    response.json({ message: "Invitation revoked." });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to revoke invitation. Please try again.",
    });
  }
};

const findValidInvitation = async (rawToken, populate) => {
  let query = Invitation.findOne({
    tokenHash: hashToken(rawToken),
    status: "Pending",
  });

  for (const path of populate) {
    query = query.populate(path);
  }

  const invitation = await query;

  if (
    !invitation ||
    invitation.expiresAt < new Date() ||
    !invitation.organization ||
    invitation.organization.status !== "Active" ||
    !invitation.position
  ) {
    return null;
  }

  return invitation;
};

export const getInvitationByToken = async (request, response) => {
  try {
    const invitation = await findValidInvitation(request.params.token, [
      { path: "organization", select: "name status" },
      { path: "position", select: "name" },
    ]);

    if (!invitation) {
      return response.status(404).json({
        message: "This invitation is invalid or has expired.",
      });
    }

    response.json({
      invitation: {
        email: invitation.email,
        position: invitation.position.name,
        organization: invitation.organization.name,
        expiresAt: invitation.expiresAt,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to load invitation. Please try again.",
    });
  }
};

export const acceptInvitation = async (request, response) => {
  try {
    const invitation = await findValidInvitation(request.params.token, [
      { path: "organization" },
      { path: "position" },
    ]);

    if (!invitation) {
      return response.status(404).json({
        message: "This invitation is invalid or has expired.",
      });
    }

    const { firstName, lastName, mobileNumber, username, password } =
      request.body;
    const errors = {};

    if (await User.findOne({ email: invitation.email })) {
      errors.email = "An account with this email already exists. Please log in.";
    }
    if (await User.findOne({ username })) {
      errors.username = "Username is already taken.";
    }
    if (await User.findOne({ mobileNumber })) {
      errors.mobileNumber = "Mobile number is already in use.";
    }

    if (Object.keys(errors).length > 0) {
      return response.status(400).json({ message: "Validation failed.", errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await withTransaction(async (session) => {
      const [user] = await User.create(
        [
          {
            firstName,
            lastName,
            email: invitation.email,
            mobileNumber,
            username,
            password: hashedPassword,
            platformRole: "user",
            lastLogin: new Date(),
          },
        ],
        { session }
      );

      await OrganizationMember.create(
        [
          {
            organization: invitation.organization._id,
            user: user._id,
            position: invitation.position._id,
            status: "Active",
          },
        ],
        { session }
      );

      invitation.status = "Accepted";
      invitation.acceptedAt = new Date();
      await invitation.save({ session });

      return {
        user,
        organization: invitation.organization,
        position: invitation.position,
      };
    });

    await establishSession(request, result);

    response.status(201).json({
      message: "Invitation accepted.",
      user: buildAuthUser(result),
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to accept invitation. Please try again.",
    });
  }
};
