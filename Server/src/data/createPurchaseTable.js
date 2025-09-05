import pool from "../config/db.js";

const createPurchaseTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS purchases (
      id UUID PRIMARY KEY,
      equipment_id UUID REFERENCES equipment(id) ON DELETE SET NULL,
      equipment_name TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
      total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
      purchase_date DATE NOT NULL,
      vendor_name TEXT NOT NULL,
      vendor_contact TEXT,
      bill_number TEXT NOT NULL,
      payment_method TEXT CHECK (payment_method IN ('Cash','Card','Bank Transfer','Cheque')) NOT NULL,
      payment_status TEXT CHECK (payment_status IN ('Paid','Pending','Partial')) NOT NULL,
      notes TEXT
    );
    
    CREATE TABLE IF NOT EXISTS purchase_items (
      id UUID PRIMARY KEY,
      purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
      equipment_name TEXT NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
      total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0)
    );
    `;

  try {
    pool.query(queryText);
    console.log("Purchase table created if not exists");
  } catch (error) {
    console.log("Error creating Purchases table : ", error);
  }
};

export default createPurchaseTable;