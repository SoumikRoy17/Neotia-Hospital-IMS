import pool from "../config/db.js";
import { randomUUID } from 'crypto';

export const getAllTestUsersService = async () => {
  const result = await pool.query("SELECT * FROM testuser");
  return result.rows;
};
export const getTestUserByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM testuser WHERE id=$1", [id]);
  return result.rows[0];
};
export const createTestUserService = async (name, email, role, department) => {
  const id = randomUUID();
  const result = await pool.query(
    "INSERT INTO testuser (id,name, email, role, department) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [id,name, email, role, department]
  );
  return result.rows[0];
};
export const updateTestUserService = async (id, name, email, role, department) => {
  const result = await pool.query(
    "UPDATE testuser SET name=$2, email=$3, role=$4, department=$5 WHERE id=$1 RETURNING *",
    [id, name, email, role, department]
  );
  return result.rows[0];
};
export const deleteTestUserService = async (id) => {
  const result = await pool.query(
    "DELETE FROM testuser WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};