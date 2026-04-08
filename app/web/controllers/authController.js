const User = require("../../../database/models/userModel");

// SIGNUP
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user (password hashed automatically via pre-save hook)
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: "Signup successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in signup" });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({ success: true, message: "Login successful", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error in login" });
    }
};