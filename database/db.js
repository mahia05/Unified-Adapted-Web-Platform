import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://InclusionHub:m%40hi%40BBHSC05@uawp.1xsczpr.mongodb.net/UAWP");
        console.log("MongoDB Atlas Connected");
    } catch (error) {
        console.log("DB Error:", error);
    }
};

export default connectDB;