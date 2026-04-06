import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://auditisinha012_db_user:ofPFJoIABL3W6uOj@UAWP.mongodb.net");
        console.log("MongoDB Atlas Connected");
    } catch (error) {
        console.log("DB Error:", error);
    }
};

export default connectDB;
