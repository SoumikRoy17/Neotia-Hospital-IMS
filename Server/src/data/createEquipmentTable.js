import pool from "../config/db.js";

const createEquipmentTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS equipment (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    serial_number TEXT UNIQUE NOT NULL,
    manufacturer TEXT,
    model TEXT,
    purchase_date DATE,
    warranty_expiry DATE,
    location TEXT,
    status TEXT CHECK (status IN ('Active','Maintenance','Retired','Out of Order')) NOT NULL DEFAULT 'Active',
    last_maintenance DATE,
    next_maintenance DATE,
    cost NUMERIC(12,2) DEFAULT 0
    )
    `;

  try {
    pool.query(queryText);
    console.log("Equipment table created if not exists");
  } catch (error) {
    console.log("Error creating Equipments table : ", error);
  }
};

export default createEquipmentTable;