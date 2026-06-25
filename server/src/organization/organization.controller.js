import Organization from "./organization.model.js";

export const getOrganization = async (request, response) => {
  try {
    const organization = await Organization.findById(request.organizationId);

    if (!organization) {
      return response.status(404).json({ message: "Organization not found." });
    }

    response.json({ organization });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to get organization. Please try again.",
    });
  }
};

export const updateOrganization = async (request, response) => {
  try {
    const { name } = request.body;

    const organization = await Organization.findByIdAndUpdate(
      request.organizationId,
      { name },
      { new: true, runValidators: true }
    );

    if (!organization) {
      return response.status(404).json({ message: "Organization not found." });
    }

    response.json({
      message: "Organization updated successfully.",
      organization,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      message: "Failed to update organization. Please try again.",
    });
  }
};
