import Help from "../../../database/models/helpModel.js";

// GET /api/admin/requests — সব help request
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
        const { status } = req.body;
        const updated = await Help.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json({ message: "Status updated", data: updated });
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
};

// DELETE /api/admin/requests/:id — request delete
export const deleteRequest = async (req, res) => {
    try {
        await Help.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};