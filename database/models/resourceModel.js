const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Hospital", "NGO", "Therapy", "School"],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);