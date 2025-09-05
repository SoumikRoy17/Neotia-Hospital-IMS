import { createPurchaseService, deletePurchaseService, getAllPurchasesService, getPurchaseByIdService } from "../models/purchases.js";



// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createPurchase = async (req, res, next) => {
  const { equipmentId, equipmentName, quantity, unitPrice, totalAmount, purchaseDate, vendorName, vendorContact, billNumber, paymentMethod, paymentStatus, notes } = req.body;
  try {
    const newPurchase = await createPurchaseService(equipmentId, equipmentName, quantity, unitPrice, totalAmount, purchaseDate, vendorName, vendorContact, billNumber, paymentMethod, paymentStatus, notes);
    handleResponse(res, 201, "Purchases created successfully", newPurchase);
  } catch (err) {
    next(err);
  }
};

export const getAllPurchases = async (req, res, next) => {
  try {
    const purchases = await getAllPurchasesService();
    handleResponse(res, 200, "Purchasess fetched successfully", purchases);
  } catch (err) {
    next(err);
  }
};

export const getPurchaseById = async (req, res, next) => {
  try {
    const purchase = await getPurchaseByIdService(req.params.id);
    if (!purchase) return handleResponse(res, 404, "Purchase not found");
    handleResponse(res, 200, "Purchases fetched successfully", purchase);
  } catch (err) {
    next(err);
  }
};

export const deletePurchase = async (req, res, next) => {
  try {
    const deletedPurchase = await deletePurchaseService(req.params.id);
    if (!deletedPurchase) return handleResponse(res, 404, "Purchase not found");
    handleResponse(res, 200, "Purchases deleted successfully", deletePurchase);
  } catch (err) {
    next(err);
  }
};