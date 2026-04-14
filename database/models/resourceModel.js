import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: {
        type: String,
        enum: ["Hospital", "NGO", "Therapy", "School", "Government"],
        required: true
    },
    disabilityType: {
        type: String,
        // Expanded to match actual resource data
        default: "All Disabilities"
    },
    country: { type: String, required: true },
    city: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    website: { type: String, default: "" },
    address: { type: String, default: "" }
}, { timestamps: true });

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;