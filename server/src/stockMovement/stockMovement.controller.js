import mongoose from "mongoose";
import StockMovement from "./stockMovement.model.js";

export const getStockMovements = async (request, response) => {
  const { from, to } = request.query;

  try {
    const createdAt = {};
    if (from) {
      const fromDate = new Date(from);
      fromDate.setHours(0, 0, 0, 0);
      createdAt.$gte = fromDate;
    }
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      createdAt.$lte = toDate;
    }

    const filter = { organization: request.organizationId };
    if (Object.keys(createdAt).length > 0) {
      filter.createdAt = createdAt;
    }

    const movements = await StockMovement.find(filter)
      .populate("product", "name stockKeepingUnit")
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(1000);

    response.json({ movements });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({
      message: "Failed to get stock movements. Please try again.",
    });
  }
};

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
