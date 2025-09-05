import express from "express";
import { createPurchase, deletePurchase, getAllPurchases, getPurchaseById } from "../controllers/purchaseController.js";
import validate from "../middlewares/validator.js";
import { purchaseSchema } from "../schemas/purchaseSchema.js";


const router = express.Router();

router.post("/purchase", validate(purchaseSchema),createPurchase);
router.get("/purchase", getAllPurchases);
router.get("/purchase/:id", getPurchaseById);
router.delete("/purchase/:id", deletePurchase);

export default router;