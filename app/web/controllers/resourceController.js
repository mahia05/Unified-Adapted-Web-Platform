import Resource from "../../../database/models/resourceModel.js";

export const getResources = async (req, res) => {
    try {
        const { category, disabilityType, country } = req.query;
        let filter = {};
        if (category && category !== "all") filter.category = category;
        if (disabilityType && disabilityType !== "all") filter.disabilityType = disabilityType;
        if (country && country !== "all") filter.country = country;
        const resources = await Resource.find(filter);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const addResource = async (req, res) => {
    try {
        const newResource = new Resource(req.body);
        await newResource.save();
        res.status(201).json(newResource);
    } catch (error) {
        res.status(500).json({ message: "Error adding resource" });
    }
};

export const deleteResource = async (req, res) => {
    try {
        await Resource.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting resource" });
    }
};