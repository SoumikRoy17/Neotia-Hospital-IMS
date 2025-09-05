import { createEquipmentService, deleteEquipmentService, getAllEquipmentsService, getEquipmentByIdService, updateEquipmentService } from "../models/equipment.js";


// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createEquipment = async (req, res, next) => {
  const { name, category, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, location, status, lastMaintenance, nextMaintenance, cost } = req.body;
  try {
    const newEquipment = await createEquipmentService(name, category, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, location, status, lastMaintenance, nextMaintenance, cost);
    handleResponse(res, 201, "Equipment created successfully", newEquipment);
  } catch (err) {
    next(err);
  }
};

export const getAllEquipments = async (req, res, next) => {
  try {
    const equipments = await getAllEquipmentsService();
    handleResponse(res, 200, "Equipments fetched successfully", equipments);
  } catch (err) {
    next(err);
  }
};

export const getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await getEquipmentByIdService(req.params.id);
    if (!equipment) return handleResponse(res, 404, "Equipment not found");
    handleResponse(res, 200, "Equipment fetched successfully", equipment);
  } catch (err) {
    next(err);
  }
};

export const updateEquipment = async (req, res, next) => {
  const { name, category, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, location, status, lastMaintenance, nextMaintenance, cost } = req.body;
  try {
    const updatedEquipment = await updateEquipmentService(req.params.id, name, category, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, location, status, lastMaintenance, nextMaintenance, cost);
    if (!updatedEquipment) return handleResponse(res, 404, "Equipment not found");
    handleResponse(res, 200, "Equipment updated successfully", updatedEquipment);
  } catch (err) {
    next(err);
  }
};

export const deleteEquipment = async (req, res, next) => {
  try {
    const deletedEquipment = await deleteEquipmentService(req.params.id);
    if (!deletedEquipment) return handleResponse(res, 404, "Equipment not found");
    handleResponse(res, 200, "Equipment deleted successfully", deleteEquipment);
  } catch (err) {
    next(err);
  }
};