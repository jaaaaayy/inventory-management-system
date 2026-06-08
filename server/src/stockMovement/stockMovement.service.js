import StockMovement from "./stockMovement.model.js";

export const recordStockMovement = async (session, data) => {
  await StockMovement.create([data], { session });
};
