import express from "express";
import { createEquipment, deleteEquipment, getAllEquipments, getEquipmentById, updateEquipment } from "../controllers/equipmentController.js";
import validate from "../middlewares/validator.js";
import { equipmentSchema } from "../schemas/equipmentSchema.js";

const router = express.Router();

router.post("/equipment", validate(equipmentSchema),createEquipment);
router.get("/equipment", getAllEquipments);
router.get("/equipment/:id", getEquipmentById);
router.put("/equipment/:id", validate(equipmentSchema), updateEquipment);
router.delete("/equipment/:id", deleteEquipment);

export default router;