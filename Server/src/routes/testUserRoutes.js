import express from "express";
import { createTestUser, deleteTestUser, getAllTestUsers, getTestUserById, updateTestUser } from "../controllers/testUserController.js";


const router = express.Router();

router.post("/user", createTestUser);
router.get("/user", getAllTestUsers);
router.get("/user/:id", getTestUserById);
router.put("/user/:id", updateTestUser);
router.delete("/user/:id", deleteTestUser);

export default router;