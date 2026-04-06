import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes
import resourceRoutes from "./app/web/routes/resourceRoutes.js";
app.use("/api/resources", resourceRoutes);

// server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});