import bcrypt from "bcrypt";
import User from "../user/user.model.js";

export const register = async (request, response) => {
  try {
    const { firstName, lastName, email, mobileNumber, username, password } =
      request.body;
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
    const newUser = new User({
      firstName,
      lastName,
      email,
      mobileNumber,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    request.session.user = { id: newUser._id, role: newUser.role };

    await User.findByIdAndUpdate(
      newUser._id,
      { lastLogin: new Date() },
      { new: true }
    );

    response.status(201).json({ message: "Registered successfully." });
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

    request.session.user = { id: findUser._id, role: findUser.role };

    await User.findByIdAndUpdate(
      findUser._id,
      { lastLogin: new Date() },
      { new: true }
    );

    response.json({
      message: "Logged in successfully.",
      session: request.session,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to login. Please try again.",
    });
  }
};

export const authStatus = (request, response) => {
  if (request.session && request.session.user) {
    return response.json({ loggedIn: true });
  }

  response.status(401).json({ loggedIn: false });
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
