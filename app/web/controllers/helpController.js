import Help from "../../../database/models/helpModel.js";
import {
    sendHelpConfirmationToUser,
    sendHelpNotificationToAdmin
} from "../../../utils/emailService.js";

// POST /api/help — Submit a new help request
export const submitHelp = async (req, res) => {
    try {
        const { name, email, phone, helpType, urgency, description } = req.body;

        if (!name || !email || !helpType || !urgency || !description) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        const newHelp = new Help({ name, email, phone, helpType, urgency, description });
        await newHelp.save();

        // Send emails (non-blocking — don't fail if email fails)
        Promise.all([
            sendHelpConfirmationToUser({ name, email, helpType, urgency, description }),
            sendHelpNotificationToAdmin({ name, email, phone, helpType, urgency, description })
        ]).catch(err => console.error("Email error:", err));

        res.status(201).json({ message: "Help request submitted successfully!", data: newHelp });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/help — Get all help requests
export const getAllHelp = async (req, res) => {
    try {
        const requests = await Help.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};