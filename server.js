import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";

const app = express();

// MIDDLEWARE
app.use(cors({
    origin: "*"
}));
app.use(express.json());

// DATABASE CONNECTION (SAFE)
let isConnected = false;

const startDB = async () => {
    if (!isConnected) {
        try {
            await connectDB();
            isConnected = true;
            console.log("MongoDB Connected");
        } catch (err) {
            console.error("DB Connection Error:", err);
        }
    }
};

startDB();

// ROUTES
import resourceRoutes from "./app/web/routes/resourceRoutes.js";
import helpRoutes from "./app/web/routes/helpRoutes.js";
import authRoutes from "./app/web/routes/authRoutes.js";

// ⚠️ Admin route only keep if backend admin APIs needed
import adminRoutes from "./app/admin/routes/adminRoutes.js";

app.use("/api/resources", resourceRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API running...");
});

// LOCAL SERVER ONLY
if (process.env.NODE_ENV !== "production") {
    app.listen(5000, () => {
        console.log("Server running locally on port 5000");
    });
}

// VERCEL EXPORT
export default app;