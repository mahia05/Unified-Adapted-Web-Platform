import express from "express";
import { getAllRequests, updateStatus, deleteRequest } from "../controllers/adminController.js";

const router = express.Router();

router.get("/requests", getAllRequests);
router.patch("/requests/:id", updateStatus);
router.delete("/requests/:id", deleteRequest);

export default router;