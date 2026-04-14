import Help from "../../../database/models/helpModel.js";
import User from "../../../database/models/userModel.js";
import Resource from "../../../database/models/resourceModel.js";
import {
    sendResolutionEmailToUser
} from "../../../utils/emailService.js";

//  HELP REQUESTS

// GET /api/admin/requests
export const getAllRequests = async (req, res) => {
    try {
        const requests = await Help.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// PATCH /api/admin/requests/:id — status update + resolve email
export const updateStatus = async (req, res) => {
    try {
        const { status, adminNote } = req.body;

        const updated = await Help.findByIdAndUpdate(
            req.params.id,
            { status, ...(adminNote !== undefined && { adminNote }) },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Request not found" });

        // Send resolution email to user when resolved
        if (status === "Resolved" && updated.email) {
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

//  USERS

// GET /api/admin/users
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

// ══════════════════════════════════════════════════════════════
//  RESOURCES (Admin manage)
// ══════════════════════════════════════════════════════════════

// GET /api/admin/resources — all resources
export const getAdminResources = async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// POST /api/admin/resources — add new resource
export const addAdminResource = async (req, res) => {
    try {
        const {
            name, description, category, disabilityType,
            country, city, phone, email, website, address
        } = req.body;

        if (!name || !category || !country) {
            return res.status(400).json({ message: "Name, category and country are required." });
        }

        const newResource = new Resource({
            name,
            description: description || "",
            category,
            disabilityType: disabilityType || "All Disabilities",
            country,
            city: city || "",
            phone: phone || "",
            email: email || "",
            website: website || "",
            address: address || ""
        });

        await newResource.save();
        res.status(201).json({ success: true, resource: newResource });
    } catch (err) {
        res.status(500).json({ message: "Error adding resource" });
    }
};

// DELETE /api/admin/resources/:id
export const deleteAdminResource = async (req, res) => {
    try {
        const deleted = await Resource.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Resource not found" });
        res.json({ message: "Resource deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};