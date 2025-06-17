import Customer from "./customer.model.js";

export const getCustomers = async (request, response) => {
  try {
    const customers = await Customer.find({
      user: request.session.user.id,
    }).sort({ createdAt: -1 });

    response.send({ customers });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to get all customers. Please try again.",
    });
  }
};

export const createCustomer = async (request, response) => {
  try {
    const { firstName, lastName, mobileNumber, email, address } = request.body;
    const errors = {};

    const existingEmail = await Customer.findOne({ email });
    if (existingEmail) {
      errors.email = "Email is already in use.";
    }

    const existingMobileNumber = await Customer.findOne({ mobileNumber });
    if (existingMobileNumber) {
      errors.mobileNumber = "Mobile number is already in use.";
    }

    if (Object.keys(errors).length > 0) {
      return response
        .status(400)
        .json({ message: "Validation failed.", errors });
    }

    const newCustomer = new Customer({
      firstName,
      lastName,
      address: {
        addressLine1: address.addressLine1,
        addressLine1: address.addressLine1,
        city: address.city,
        province: address.province,
        postalCode: address.postalCode,
      },
      mobileNumber,
      email,
      user: request.session.user.id,
    });
    await newCustomer.save();

    response.status(201).send({
      message: "Customer created successfully.",
      customer: newCustomer,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to create user. Please try again.",
    });
  }
};

export const getCustomerById = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid customer id.",
      });
    }

    const findCustomer = await Customer.findById(id);

    if (!findCustomer) {
      return response.status(404).send({ message: "Customer not found." });
    }

    response.send({ customer: findCustomer });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to get customer. Please try again.",
    });
  }
};

export const updateCustomer = async (request, response) => {
  const {
    params: { id },
    body,
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid customer id.",
      });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return response.status(404).send({ message: "Customer not found." });
    }

    response.send({
      message: "Customer updated successfully.",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to update customer. Please try again.",
    });
  }
};

export const deleteCustomer = async (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Invalid customer id.",
      });
    }

    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return response.status(404).send({ message: "Customer not found." });
    }

    response.send({ message: "Customer deleted successfully." });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to delete customer. Please try again.",
    });
  }
};
