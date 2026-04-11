import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database
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

// test
app.get("/", (req, res) => {
    res.send("API running...");
});

// LOCAL + VERCEL BOTH SUPPORT
if (process.env.NODE_ENV !== "production") {
    app.listen(5000, () => console.log("Server running locally"));
}

// Vercel এর জন্য
export default app;