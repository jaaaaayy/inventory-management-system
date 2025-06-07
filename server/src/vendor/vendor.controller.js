import Vendor from "./vendor.model.js";

export const getVendors = async (request, response) => {
  try {
    const vendors = await Vendor.find({ user: request.session.user.id }).sort({
      createdAt: -1,
    });

    response.send({ vendors });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get vendors. Please try again.",
    });
  }
};

export const getVendorById = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid vendor id.",
      });
    }

    const findVendor = await Vendor.findById(id);

    if (!findVendor) {
      return response.status(404).json({ message: "Vendor not found." });
    }

    response.json({ vendor: findVendor });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get vendor. Please try again.",
    });
  }
};

export const createVendor = async (request, response) => {
  try {
    const { name, email, mobileNumber, address } = request.body;
    const errors = {};

    const existingEmail = await Vendor.findOne({ email });
    if (existingEmail) {
      errors.email = "Email is already in use.";
    }

    const existingMobileNumber = await Vendor.findOne({ mobileNumber });
    if (existingMobileNumber) {
      errors.mobileNumber = "Mobile number is already in use.";
    }

    if (Object.keys(errors).length > 0) {
      return response
        .status(400)
        .json({ message: "Validation failed.", errors });
    }

    const newVendor = new Vendor({
      name,
      email,
      mobileNumber,
      address,
      user: request.session.user.id,
    });
    await newVendor.save();

    response
      .status(201)
      .send({ message: "Vendor created successfully.", vendor: newVendor });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to create vendor. Please try again.",
    });
  }
};

export const updateVendor = async (request, response) => {
  const {
    params: { id },
    body,
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid vendor id.",
      });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedVendor) {
      return response.status(404).json({ message: "Vendor not found." });
    }

    response.json({
      message: "Vendor updated successfully.",
      vendor: updatedVendor,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to update vendor. Please try again.",
    });
  }
};

export const deleteVendor = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid vendor id.",
      });
    }

    const deletedVendor = await Vendor.findByIdAndDelete(id);

    if (!deletedVendor) {
      return response.status(404).json({ message: "Vendor not found." });
    }

    response.json({ message: "Vendor deleted successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to delete vendor. Please try again.",
    });
  }
};
