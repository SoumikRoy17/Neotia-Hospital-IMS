import pool from "../config/db.js";
import { randomUUID } from 'crypto';

export const getAllEquipmentsService = async () => {
  const result = await pool.query("SELECT * FROM equipment");
  return result.rows;
};
export const getEquipmentByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM equipment WHERE id=$1", [id]);
  return result.rows[0];
};
export const createEquipmentService = async (name, category, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, location, status, lastMaintenance, nextMaintenance, cost) => {
  const id = randomUUID();
  const result = await pool.query(
    "INSERT INTO equipment (id, name, category, serial_number, manufacturer, model, purchase_date, warranty_expiry, location, status, last_maintenance, next_maintenance, cost) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
    [id, name, category, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, location, status, lastMaintenance, nextMaintenance, cost]
  );
  return result.rows[0];
};
export const updateEquipmentService = async (id, name, category, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, location, status, lastMaintenance, nextMaintenance, cost) => {
  const result = await pool.query(
    "UPDATE equipment SET name=$2, category=$3, serial_number=$4, manufacturer=$5, model=$6, purchase_date=$7, warranty_expiry=$8, location=$9, status=$10, last_maintenance=$11, next_maintenance=$12, cost=$13 WHERE id=$1 RETURNING *",
    [id, name, category, serialNumber, manufacturer, model, purchaseDate, warrantyExpiry, location, status, lastMaintenance, nextMaintenance, cost]
  );
  return result.rows[0];
};
export const deleteEquipmentService = async (id) => {
  const result = await pool.query(
    "DELETE FROM equipment WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};