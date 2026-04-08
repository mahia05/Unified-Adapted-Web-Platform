import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// ROUTES
import resourceRoutes from "./app/web/routes/resourceRoutes.js";
import helpRoutes from "./app/web/routes/helpRoutes.js";
import adminRoutes from "./app/admin/routes/adminRoutes.js";
import authRoutes from "./app/web/routes/authRoutes.js";

app.use("/api/resources", resourceRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));