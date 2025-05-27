import bcrypt from "bcrypt";
import User from "./user.model.js";

export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

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
    const findUser = await User.findById(request.params.id);

    if (!findUser) {
      return response.status(404).json({ message: "User not found." });
    }
    response.json({ user: findUser });
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

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

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
    const deletedUser = await User.findByIdAndDelete(request.params.id);

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
