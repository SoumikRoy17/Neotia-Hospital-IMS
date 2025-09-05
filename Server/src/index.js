import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import testUserRoutes from "./routes/testUserRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createEquipmentTable from "./data/createEquipmentTable.js";
import createPurchaseTable from "./data/createPurchaseTable.js";
import createTestUserTable from "./data/createTestUserTable.js";
import createTicketTable from "./data/createTicketTable.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", equipmentRoutes);
app.use("/api", purchaseRoutes);
app.use("/api", testUserRoutes);
app.use("/api", ticketRoutes);

// Error handling middleware
app.use(errorHandling);

//Create table before starting server
createEquipmentTable();
createPurchaseTable();
createTestUserTable();
createTicketTable();

// Testing POSTGRES Connection
app.get("/", async (req, res) => {
  console.log("Start");
  const result = await pool.query("SELECT current_database()");
  console.log("result");
  res.send(`The database name is : ${result.rows[0].current_database}`);
});
// Server running
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});