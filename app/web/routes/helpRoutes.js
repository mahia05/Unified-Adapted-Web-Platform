app.post("/api/help", (req, res) => {
  console.log(req.body); // form data dekhabe
  res.json({ message: "Data received" });
});