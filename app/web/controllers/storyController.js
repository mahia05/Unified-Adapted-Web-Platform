import Story from "../../../database/models/storyModel.js";

// ── GET /api/stories — ONLY Approved stories (public) ────────
export const getStories = async (req, res) => {
    try {
        const { category } = req.query;
        let filter = { status: "Approved" };
        if (category && category !== "all") filter.category = category;

        const stories = await Story.find(filter)
            .select("-likedIPs")
            .sort({ createdAt: -1 });

        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// ── POST /api/stories — user submits, goes to Pending ────────
export const submitStory = async (req, res) => {
    try {
        const { name, title, category, body } = req.body;

        if (!name || !title || !category || !body) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const story = new Story({
            name, title, category, body,
            status: "Pending",   // Must be approved by admin first
            source: "user"
        });
        await story.save();

        res.status(201).json({
            success: true,
            message: "Story submitted! It will appear after admin review."
        });
    } catch (err) {
        res.status(500).json({ message: "Submission failed." });
    }
};

// ── POST /api/stories/:id/like — toggle like by IP ───────────
export const likeStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: "Story not found" });

        const ip = req.headers["x-forwarded-for"]?.split(",")[0].trim()
            || req.socket.remoteAddress
            || "unknown";

        const alreadyLiked = story.likedIPs.includes(ip);
        if (alreadyLiked) {
            story.likedIPs = story.likedIPs.filter(i => i !== ip);
            story.hearts = Math.max(0, story.hearts - 1);
        } else {
            story.likedIPs.push(ip);
            story.hearts += 1;
        }
        await story.save();

        // Return global heart count — all clients will sync to this
        res.json({ hearts: story.hearts, liked: !alreadyLiked });
    } catch (err) {
        res.status(500).json({ message: "Like failed." });
    }
};

// ════════════════════════════════════════════════════════════
//  ADMIN routes
// ════════════════════════════════════════════════════════════

// ── GET /api/admin/stories — all stories (any status) ────────
export const getAllStories = async (req, res) => {
    try {
        const stories = await Story.find()
            .select("-likedIPs")
            .sort({ createdAt: -1 });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// ── POST /api/admin/stories — admin adds story (auto Approved) 
export const addStory = async (req, res) => {
    try {
        const { name, title, category, body } = req.body;
        if (!name || !title || !category || !body) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const story = new Story({
            name, title, category, body,
            status: "Approved",   // Admin stories go live immediately
            source: "admin"
        });
        await story.save();
        res.status(201).json({ success: true, story });
    } catch (err) {
        res.status(500).json({ message: "Failed to add story." });
    }
};

// ── PATCH /api/admin/stories/:id — approve / reject ──────────
export const updateStoryStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Approved", "Rejected", "Pending"].includes(status)) {
            return res.status(400).json({ message: "Invalid status." });
        }
        const story = await Story.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!story) return res.status(404).json({ message: "Story not found" });
        res.json({ success: true, story });
    } catch (err) {
        res.status(500).json({ message: "Update failed." });
    }
};

// ── DELETE /api/admin/stories/:id ────────────────────────────
export const deleteStory = async (req, res) => {
    try {
        await Story.findByIdAndDelete(req.params.id);
        res.json({ message: "Story deleted." });
    } catch (err) {
        res.status(500).json({ message: "Delete failed." });
    }
};