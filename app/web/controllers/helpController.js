import Help from "../../../database/models/helpModel.js";
import {
    sendHelpConfirmationToUser,
    sendHelpNotificationToAdmin
} from "../../../utils/emailService.js";

// ── POST /api/help — Submit a new help request ───────────────
export const submitHelp = async (req, res) => {
    try {
        const { name, email, phone, location, disability, helpType, urgency, description } = req.body;

        // Validate required fields
        if (!name || !email || !helpType || !urgency || !description) {
            return res.status(400).json({ success: false, message: "Please fill in all required fields." });
        }

        const newHelp = new Help({
            name,
            email,
            phone: phone || "",
            location: location || "",
            disability: disability || "",
            helpType,
            urgency,
            description,
            status: "Pending"
        });

        await newHelp.save();

        // ── Send confirmation email to user (if email provided) ──
        if (email) {
            sendHelpConfirmationToUser({
                name,
                email,
                helpType,
                urgency,
                description
            }).catch(err => console.error("User confirmation email error:", err));
        }

        // ── Notify admin ─────────────────────────────────────────
        sendHelpNotificationToAdmin({
            name,
            email,
            phone: phone || "—",
            helpType,
            urgency,
            description
        }).catch(err => console.error("Admin notification email error:", err));

        res.status(201).json({ success: true, message: "Help request submitted successfully." });

    } catch (error) {
        console.error("Help Submit Error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
};

// ── GET /api/help — Get all help requests (admin use) ────────
export const getAllHelp = async (req, res) => {
    try {
        const requests = await Help.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};