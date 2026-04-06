import Resource from "../../../database/models/resourceModel.js";

// GET all resources
export const getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// ADD resource
export const addResource = async (req, res) => {
    try {
        const newResource = new Resource(req.body);
        await newResource.save();
        res.json(newResource);
    } catch (error) {
        res.status(500).json({ message: "Error adding resource" });
    }
};