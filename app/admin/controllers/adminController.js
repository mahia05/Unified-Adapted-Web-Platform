import Help from "../../../database/models/helpModel.js";
import User from "../../../database/models/userModel.js";
import { sendResolutionEmailToUser } from "../../../utils/emailService.js";

// ── HELP REQUESTS ────────────────────────────────────────────

// GET /api/admin/requests
export const getAllRequests = async (req, res) => {
    try {
        const requests = await Help.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// PATCH /api/admin/requests/:id — status update
export const updateStatus = async (req, res) => {
    try {
        const { status, adminNote } = req.body;

        const updated = await Help.findByIdAndUpdate(
            req.params.id,
            { status, ...(adminNote && { adminNote }) },
            { new: true }
        );

        // If resolved → send email to user
        if (status === "Resolved" && updated) {
            sendResolutionEmailToUser({
                name: updated.name,
                email: updated.email,
                helpType: updated.helpType,
                description: updated.description,
                adminNote: updated.adminNote || ""
            }).catch(err => console.error("Resolution email error:", err));
        }

        res.json({ message: "Status updated", data: updated });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
};

// DELETE /api/admin/requests/:id
export const deleteRequest = async (req, res) => {
    try {
        await Help.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};

// ── USERS ────────────────────────────────────────────────────

// GET /api/admin/users — all registered users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};