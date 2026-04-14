import Resource from "../../../database/models/resourceModel.js";

// ── GET /api/resources — filter by category, disability, country
export const getResources = async (req, res) => {
    try {
        const { category, disabilityType, country } = req.query;
        let filter = {};
        if (category && category !== "all") filter.category = category;
        if (disabilityType && disabilityType !== "all") filter.disabilityType = disabilityType;
        if (country && country !== "all") filter.country = country;

        const resources = await Resource.find(filter).sort({ createdAt: -1 });
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// ── POST /api/resources — Admin adds a new resource ──────────
export const addResource = async (req, res) => {
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
            disabilityType: disabilityType || "Motor",
            country,
            city: city || "",
            phone: phone || "",
            email: email || "",
            website: website || "",
            address: address || ""
        });

        await newResource.save();
        res.status(201).json({ success: true, resource: newResource });
    } catch (error) {
        res.status(500).json({ message: "Error adding resource" });
    }
};

// ── DELETE /api/resources/:id — Admin deletes a resource ─────
export const deleteResource = async (req, res) => {
    try {
        const deleted = await Resource.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Resource not found" });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting resource" });
    }
};