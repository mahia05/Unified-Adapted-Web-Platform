const Resource = require("../../../database/models/resourceModel");

// GET all resources
exports.getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// ADD resource (for testing এখন)
exports.addResource = async (req, res) => {
    try {
        const newResource = new Resource(req.body);
        await newResource.save();
        res.json(newResource);
    } catch (error) {
        res.status(500).json({ message: "Error adding resource" });
    }
};