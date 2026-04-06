const express = require("express");
const app = express();

app.use(express.json());

// TEST route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// HELP API
app.post("/api/help", (req, res) => {
  console.log(req.body); // 👈 data show করবে terminal এ
  res.json({ message: "Data received" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});