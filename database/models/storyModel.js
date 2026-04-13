import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: {
        type: String,
        enum: ["Motor", "Cognitive", "Autism", "Visual", "Hearing", "Other"],
        required: true
    },
    excerpt: { type: String },          // auto-generated from body if not provided
    body: { type: String, required: true },
    hearts: { type: Number, default: 0 },
    likedIPs: [{ type: String }],        // store IPs to prevent duplicate likes
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"               // user submissions need admin approval
    },
    source: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

// Auto-generate excerpt before save
storySchema.pre("save", function () {
    if (!this.excerpt && this.body) {
        this.excerpt = this.body.substring(0, 140).trim() + (this.body.length > 140 ? "…" : "");
    }
});

const Story = mongoose.model("Story", storySchema);
export default Story;