import pool from "../config/db.js";
import { randomUUID } from 'crypto';

//Tickets
export const getAllTicketsService = async () => {
  const result = await pool.query("SELECT * FROM tickets");
  return result.rows;
};
export const getTicketByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM tickets WHERE id=$1", [id]);
  return result.rows[0];
};
export const createTicketService = async (title, description, category, priority, status, assigned_to, created_by, department, attachments) => {
  const id = randomUUID();
  const result = await pool.query(
    "INSERT INTO tickets (id, title, description, category, priority, status, assigned_to, created_by, department, attachments) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
    [id, title, description, category, priority, status || "Open", assigned_to || null, created_by, department, attachments || null]
  );
  return result.rows[0];
};
export const updateTicketService = async (id, title, description, category, priority, status, assigned_to,  department, attachments) => {
  const result = await pool.query(
    "UPDATE tickets SET title=$2, description=$3, category=$4, priority=$5, status=$6, assigned_to=$7, department=$8, updated_at=NOW(), attachments=$9 WHERE id=$1 RETURNING *",
    [id, title, description, category, priority, status, assigned_to, department, attachments]
  );
  return result.rows[0];
};
export const deleteTicketService = async (id) => {
  const result = await pool.query(
    "DELETE FROM tickets WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};


// ticket comments

export const addTicketCommentService = async (ticket_id, author, content, is_internal) => {
    const id=randomUUID();
    const result = await pool.query(
        "INSERT INTO ticket_comments (id, ticket_id, author, content, is_internal) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [id, ticket_id, author, content, is_internal]
    );
    return result.rows[0];
};
export const getTicketCommentService = async (ticket_id) => {
    const result = await pool.query(
        "SELECT c.id, c.content, c.created_at, c.is_internal, u.name AS author FROM ticket_comments c LEFT JOIN testuser u ON c.author = u.id WHERE c.ticket_id = $1 ORDER BY c.created_at ASC",
        [ticket_id]
    );
    return result.rows;
};