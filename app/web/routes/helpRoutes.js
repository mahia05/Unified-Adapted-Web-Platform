import express from "express";
import { submitHelp, getAllHelp } from "../controllers/helpController.js";

const router = express.Router();

router.post("/", submitHelp);   // POST /api/help
router.get("/", getAllHelp);    // GET  /api/help

export default router;