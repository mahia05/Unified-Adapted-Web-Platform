import express from "express";
const router = express.Router();
import { getResources, addResource, deleteResource } from "../controllers/resourceController.js";

router.get("/", getResources);
router.post("/", addResource);
router.delete("/:id", deleteResource);

export default router;