import express from "express";
import {
    getStories,
    submitStory,
    likeStory
} from "../controllers/storyController.js";

const router = express.Router();

router.get("/", getStories);    // GET  /api/stories
router.post("/", submitStory);   // POST /api/stories
router.post("/:id/like", likeStory);     // POST /api/stories/:id/like

export default router;