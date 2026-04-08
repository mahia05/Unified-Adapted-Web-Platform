import mongoose from "mongoose";

const helpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    helpType: {
        type: String,
        enum: ["Medical Support", "Educational Support", "Financial Help", "Assistive Device"],
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
    adminNote: { type: String, default: "" }  // admin can add a resolution note
}, { timestamps: true });

const Help = mongoose.model("Help", helpSchema);
export default Help;