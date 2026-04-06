import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    link: String,
    category: String
}, {
    timestamps: true
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;