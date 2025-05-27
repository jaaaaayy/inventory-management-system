import Vendor from "./vendor.model.js";

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
    });
    await newVendor.save();

    response
      .status(201)
      .send({ message: "Vendor created successfully.", vendor: newVendor });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to create vendor. Please try again.",
    });
  }
};

export const getAllVendors = async (request, response) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });

    response.send({ vendors });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to get all vendors. Please try again.",
    });
  }
};
