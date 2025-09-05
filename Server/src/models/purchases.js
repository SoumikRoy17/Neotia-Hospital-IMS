import pool from "../config/db.js";
import { randomUUID } from 'crypto';

export const getAllPurchasesService = async () => {
  const result = await pool.query("SELECT * FROM purchases ORDER BY purchase_date DESC");
  return result.rows;
};
export const getPurchaseByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM purchases WHERE id=$1", [id]);
  return result.rows[0];
};
export const createPurchaseService = async (equipmentId, equipmentName, quantity, unitPrice, totalAmount, purchaseDate, vendorName, vendorContact, billNumber, paymentMethod, paymentStatus, notes) => {
  const id = randomUUID();
  const result = await pool.query(
    "INSERT INTO purchases (id, equipment_id, equipment_name, quantity, unit_price, total_amount, purchase_date, vendor_name, vendor_contact, bill_number, payment_method, payment_status, notes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
    [id, equipmentId || null, equipmentName, quantity, unitPrice, totalAmount, purchaseDate, vendorName, vendorContact, billNumber, paymentMethod, paymentStatus, notes]
  );
  return result.rows[0];
};

export const deletePurchaseService = async (id) => {
  const result = await pool.query(
    "DELETE FROM purchases WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};