import express from "express";
import {
    getAllRequests,
    updateStatus,
    deleteRequest,
    getAllUsers,
    deleteUser
} from "../controllers/adminController.js";

const router = express.Router();

// Help requests
router.get("/requests", getAllRequests);
router.patch("/requests/:id", updateStatus);
router.delete("/requests/:id", deleteRequest);

// Users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

export default router;