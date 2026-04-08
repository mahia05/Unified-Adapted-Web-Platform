// app/web/controllers/authController.js
import User from "../../../database/models/userModel.js";
import bcrypt from "bcryptjs";

// SIGNUP
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "Signup successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in signup" });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({ success: true, message: "Login successful", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in login" });
    }
};