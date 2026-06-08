import mongoose from "mongoose";
import StockMovement from "./stockMovement.model.js";

export const getProductStockMovements = async (request, response) => {
  const {
    params: { productId },
  } = request;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return response.status(400).json({
        message: "Invalid product id.",
      });
    }

    const movements = await StockMovement.find({
      product: productId,
      organization: request.organizationId,
    })
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(100);

    response.json({ movements });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get stock movements. Please try again.",
    });
  }
};
