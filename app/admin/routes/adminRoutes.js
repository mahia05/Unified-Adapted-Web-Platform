import express from "express";
import {
    getAllRequests,
    updateStatus,
    deleteRequest,
    getAllUsers,
    deleteUser,
    getAdminResources,
    addAdminResource,
    deleteAdminResource
} from "../controllers/adminController.js";
import {
    getAllStories,
    addStory,
    updateStoryStatus,
    deleteStory
} from "../../web/controllers/storyController.js";

const router = express.Router();

// ── Help Requests ──────────────────────────────────────────
router.get("/requests", getAllRequests);
router.patch("/requests/:id", updateStatus);
router.delete("/requests/:id", deleteRequest);

// ── Users ──────────────────────────────────────────────────
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// ── Stories ────────────────────────────────────────────────
router.get("/stories", getAllStories);
router.post("/stories", addStory);
router.patch("/stories/:id", updateStoryStatus);
router.delete("/stories/:id", deleteStory);

// ── Resources ──────────────────────────────────────────────
router.get("/resources", getAdminResources);
router.post("/resources", addAdminResource);
router.delete("/resources/:id", deleteAdminResource);

export default router;