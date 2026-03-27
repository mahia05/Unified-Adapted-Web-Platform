const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/uawp");

// Routes
const resourceRoutes = require("./app/web/routes/resourceRoutes");
app.use("/api/resources", resourceRoutes);

// server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});