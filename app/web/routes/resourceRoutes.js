import express from "express";
const router = express.Router();

import {
    getResources,
    addResource
} from "../controllers/resourceController.js";

// GET all resources
router.get("/", getResources);

// ADD new resource
router.post("/", addResource);

export default router;