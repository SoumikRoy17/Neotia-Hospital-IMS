import { addTicketCommentService, createTicketService, deleteTicketService, getAllTicketsService, getTicketByIdService, getTicketCommentService, updateTicketService } from "../models/ticket.js";


// Standardized response function
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createTicket = async (req, res, next) => {
    const { title, description, category, priority, status, assigned_to, created_by, department, attachments } = req.body;
    try {
        const newTicket = await createTicketService(title, description, category, priority, status, assigned_to, created_by, department, attachments);
        handleResponse(res, 201, "tickets created successfully", newTicket);
    } catch (err) {
        next(err);
    }
};

export const getAllTickets = async (req, res, next) => {
    try {
        const tickets = await getAllTicketsService();
        handleResponse(res, 200, "tickets fetched successfully", tickets);
    } catch (err) {
        next(err);
    }
};

export const getTicketById = async (req, res, next) => {
    try {
        const ticket = await getTicketByIdService(req.params.id);
        if (!equipment) return handleResponse(res, 404, "Ticket not found");
        handleResponse(res, 200, "tickets fetched successfully", ticket);
    } catch (err) {
        next(err);
    }
};

export const updateTicket = async (req, res, next) => {
    const { title, description, category, priority, status, assigned_to, department, attachments } = req.body;
    try {
        const updatedTicket = await updateTicketService(req.params.id, title, description, category, priority, status, assigned_to, department, attachments);
        if (!updatedTicket) return handleResponse(res, 404, "Ticket not found");
        handleResponse(res, 200, "Ticket updated successfully", updatedTicket);
    } catch (err) {
        next(err);
    }
};

export const deleteTicket = async (req, res, next) => {
    try {
        const deletedTicket = await deleteTicketService(req.params.id);
        if (!deletedTicket) return handleResponse(res, 404, "Ticket not found");
        handleResponse(res, 200, "Ticket deleted successfully", deleteTicket);
    } catch (err) {
        next(err);
    }
};

//Ticket Comments
export const addTicketComment = async (req, res, next) => {
    const { ticket_id, author, content, is_internal } = req.body;
    try {
        const addticketComment = await addTicketCommentService( ticket_id, author, content, is_internal);
        if (!addticketComment) return handleResponse(res, 404, "Ticket Comment not found");
        handleResponse(res, 200, "Ticket Comment created successfully",addticketComment);
    } catch (err) {
        next(err);
    }
};
export const getTicketComments = async (req, res, next) => {
//   try {
//     const ticketComment = await getTicketCommentService(req.params.id);
//     if (!ticketComment) return handleResponse(res, 404, "Ticket Comment not found");
//     handleResponse(res, 200, "Ticket Comment fetched successfully",ticketComment);
//   } catch (err) {
//     next(err);
//   }
    try {
        const ticketId = req.params.id;
        const comments = await getTicketCommentService(ticketId);

        if (!comments || comments.length === 0) {
        return handleResponse(res, 404, "No comments found for this ticket");
        }

        return handleResponse(res, 200, "Comments fetched successfully", comments);
    } catch (err) {
        next(err);
    }
};