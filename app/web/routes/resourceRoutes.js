const express = require("express");
const router = express.Router();

const {
    getResources,
    addResource
} = require("../controllers/resourceController");

// GET
router.get("/", getResources);

// POST
router.post("/", addResource);

module.exports = router;