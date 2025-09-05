import express from "express";
import { addTicketComment, createTicket, deleteTicket, getAllTickets, getTicketById, getTicketComments, updateTicket } from "../controllers/ticketsController.js";



const router = express.Router();

router.post("/ticket", createTicket);
router.get("/ticket", getAllTickets);
router.get("/ticket/:id", getTicketById);
router.put("/ticket/:id", updateTicket);
router.delete("/ticket/:id", deleteTicket);

//Ticket comments
router.post("/ticket/:id/comments", addTicketComment);
router.get("/ticket/:id/comments", getTicketComments);

export default router;