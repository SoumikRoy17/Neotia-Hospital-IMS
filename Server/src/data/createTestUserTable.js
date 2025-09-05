import pool from "../config/db.js";

const createTestUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS testuser (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
    `;

  try {
    pool.query(queryText);
    console.log("Test User table created if not exists");
  } catch (error) {
    console.log("Error creating Test Users table : ", error);
  }
};

export default createTestUserTable;