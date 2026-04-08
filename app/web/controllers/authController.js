import User from "../../../database/models/userModel.js";
import bcrypt from "bcryptjs";

// ── SIGNUP ──
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: "Signup successful" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "Error in signup" });
    }
};

// ── LOGIN ──
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // ✅ সঠিক পদ্ধতি
        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({ success: true, message: "Login successful", user: userData });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Error in login" });
    }
};