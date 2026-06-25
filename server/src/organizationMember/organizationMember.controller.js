import OrganizationMember from "./organizationMember.model.js";
import Position from "../position/position.model.js";
import { POSITION_NAMES } from "../config/seedRbac.js";

export const getMembers = async (request, response) => {
  try {
    const members = await OrganizationMember.find({
      organization: request.organizationId,
    })
      .populate("user", "-password")
      .populate("position", "name")
      .sort({ createdAt: 1 });

    response.json({ members });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to get members. Please try again.",
    });
  }
};

export const updateMember = async (request, response) => {
  try {
    const { id } = request.params;
    const { position: positionName, status } = request.body;

    const membership = await OrganizationMember.findOne({
      _id: id,
      organization: request.organizationId,
    }).populate("position", "name");

    if (!membership) {
      return response.status(404).json({ message: "Member not found." });
    }

    if (membership._id.equals(request.member._id)) {
      return response.status(400).json({
        message: "You cannot change your own membership.",
      });
    }

    if (membership.position?.name === POSITION_NAMES.OWNER) {
      return response.status(403).json({
        message: "The owner's membership cannot be changed.",
      });
    }

    const update = {};

    if (positionName !== undefined) {
      if (positionName === POSITION_NAMES.OWNER) {
        return response.status(400).json({
          message: "You cannot assign the Owner position.",
        });
      }

      const position = await Position.findOne({ name: positionName });
      if (!position) {
        return response.status(400).json({ message: "Invalid position." });
      }

      update.position = position._id;
    }

    if (status !== undefined) {
      update.status = status;
    }

    const updatedMember = await OrganizationMember.findByIdAndUpdate(
      membership._id,
      update,
      { new: true, runValidators: true }
    )
      .populate("user", "-password")
      .populate("position", "name");

    response.json({
      message: "Member updated successfully.",
      member: updatedMember,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to update member. Please try again.",
    });
  }
};

export const removeMember = async (request, response) => {
  try {
    const { id } = request.params;

    const membership = await OrganizationMember.findOne({
      _id: id,
      organization: request.organizationId,
    }).populate("position", "name");

    if (!membership) {
      return response.status(404).json({ message: "Member not found." });
    }

    if (membership._id.equals(request.member._id)) {
      return response.status(400).json({
        message: "You cannot remove yourself.",
      });
    }

    if (membership.position?.name === POSITION_NAMES.OWNER) {
      return response.status(403).json({
        message: "The owner cannot be removed.",
      });
    }

    await OrganizationMember.findByIdAndDelete(membership._id);

    response.json({ message: "Member removed successfully." });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to remove member. Please try again.",
    });
  }
};
