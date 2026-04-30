import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";

const app = express();

// MIDDLEWARE
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.use(express.json());

// DATABASE CONNECT
const startDB = async () => {
    try {
        await connectDB();
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
};

startDB();

// ROUTES
import resourceRoutes from "./app/web/routes/resourceRoutes.js";
import helpRoutes from "./app/web/routes/helpRoutes.js";
import authRoutes from "./app/web/routes/authRoutes.js";
import adminRoutes from "./app/admin/routes/adminRoutes.js";
import storyRoutes from "./app/web/routes/storyRoutes.js";

app.use("/api/resources", resourceRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stories", storyRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API running...");
});

// RENDER PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/test-email", async (req, res) => {
    const { sendHelpConfirmationToUser } = await import("./utils/emailService.js");
    try {
        await sendHelpConfirmationToUser({
            name: "Test User",
            email: "helpcenteruawp@gmail.com",
            helpType: "General",
            urgency: "Low",
            description: "This is a test."
        });
        res.send("Email sent!");
    } catch (err) {
        res.send("Error: " + err.message);
    }
});