import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    category: {
        type: String,
        enum: ["Hospital", "NGO", "Therapy", "School", "Government"],
        required: true
    },
    disabilityType: {
        type: String,
        enum: ["Motor", "Cognitive", "Both"],
        required: true
    },
    country: { type: String, required: true },
    city: String,
    phone: String,
    email: String,
    website: String,
    address: String
}, { timestamps: true });

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;