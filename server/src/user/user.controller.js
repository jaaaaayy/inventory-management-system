import bcrypt from "bcrypt";
import User from "./user.model.js";

export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find({
      organization: request.organizationId,
    })
      .select("-password")
      .sort({ createdAt: -1 });

    response.json({ users });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to get all users. Please try again.",
    });
  }
};

export const getUserById = async (request, response) => {
  try {
    const user = await User.findOne({
      _id: request.params.id,
      organization: request.organizationId,
    }).select("-password");

    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }

    response.json({ user });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to get user. Please try again.",
    });
  }
};

export const updateUserById = async (request, response) => {
  try {
    const {
      params: { id },
      body,
    } = request;
    const allowedUserFields = [
      "firstName",
      "lastName",
      "email",
      "mobileNumber",
      "username",
      "password",
      "status",
    ];
    const userUpdate = {};

    for (const field of allowedUserFields) {
      if (body[field] !== undefined) {
        userUpdate[field] = body[field];
      }
    }

    if (userUpdate.password) {
      userUpdate.password = await bcrypt.hash(userUpdate.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id, organization: request.organizationId },
      userUpdate,
      {
        new: true,
        runValidators: true,
        select: "-password",
      }
    );

    if (!updatedUser) {
      return response.status(404).json({ message: "User not found." });
    }

    response.json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to update user. Please try again.",
    });
  }
};

export const deleteUserById = async (request, response) => {
  try {
    if (request.params.id === request.userId.toString()) {
      return response.status(400).json({
        message: "You cannot delete your own user account.",
      });
    }

    const deletedUser = await User.findOneAndDelete({
      _id: request.params.id,
      organization: request.organizationId,
    });

    if (!deletedUser) {
      return response.status(404).json({ message: "User not found." });
    }

    response.json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to delete user. Please try again.",
    });
  }
};
