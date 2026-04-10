import mongoose from "mongoose";

const helpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    disability: {
        type: String,
        enum: ["Motor", "Cognitive", "Autism", "Other", ""],
        default: ""
    },
    helpType: {
        type: String,
        enum: [
            "Hospital / Medical Support",
            "School / Educational Support",
            "NGO Support",
            "Therapy Center",
            "Assistive Device",
            "Financial Help",
            "Other"
        ],
        required: true
    },
    urgency: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true
    },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Reviewed", "Resolved"],
        default: "Pending"
    },
    adminNote: { type: String, default: "" }
}, { timestamps: true });

const Help = mongoose.model("Help", helpSchema);
export default Help;