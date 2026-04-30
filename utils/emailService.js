import nodemailer from "nodemailer";

// ── Transporter ──────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },

  //(Render timeout solve)
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 20000,
  socketTimeout: 20000
});


// ── 1. Email to USER when they submit a help request ─────────
export const sendHelpConfirmationToUser = async ({
  name,
  email,
  helpType,
  urgency,
  description
}) => {
  try {
    console.log("User email sending...");

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #F8F3D9; margin: 0; padding: 0; }
        .wrap { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 32px rgba(63,59,35,0.12); }
        .header { background: #3f3b23; padding: 32px 36px 24px; text-align: center; }
        .logo { font-size: 26px; font-weight: 800; color: #c2b779; letter-spacing: 3px; }
        .body { padding: 36px; }
        .greeting { font-size: 20px; font-weight: 700; color: #3f3b23; margin-bottom: 10px; }
        .text { font-size: 14px; color: #6b6445; line-height: 1.7; margin-bottom: 24px; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="header">
          <div class="logo">UAWP</div>
        </div>
        <div class="body">
          <div class="greeting">Hello ${name}</div>
          <p class="text">Your request has been received.</p>
          <p><b>Type:</b> ${helpType}</p>
          <p><b>Urgency:</b> ${urgency}</p>
          <p><b>Description:</b> ${description}</p>
        </div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
      from: `"UAWP Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Help Request Received - ${helpType}`,
      html
    });

    console.log("User email sent");
  } catch (err) {
    console.log("User email error:", err);
  }
};


// ── 2. Email to ADMIN ───────────────────────────────────────
export const sendHelpNotificationToAdmin = async ({
  name,
  email,
  phone,
  helpType,
  urgency,
  description
}) => {
  try {
    console.log("Admin email sending...");

    const html = `
      <h2>New Help Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "N/A"}</p>
      <p><b>Type:</b> ${helpType}</p>
      <p><b>Urgency:</b> ${urgency}</p>
      <p><b>Description:</b> ${description}</p>
    `;

    await transporter.sendMail({
      from: `"UAWP System" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Help Request - ${name}`,
      html
    });

    console.log("Admin email sent");
  } catch (err) {
    console.log("Admin email error:", err);
  }
};


// ── 3. RESOLUTION EMAIL ─────────────────────────────────────
export const sendResolutionEmailToUser = async ({
  name,
  email,
  helpType,
  description,
  adminNote
}) => {
  try {
    console.log("Resolution email sending...");

    const html = `
      <h2>Request Resolved</h2>
      <p>Hello ${name}, your request is resolved.</p>
      <p><b>Type:</b> ${helpType}</p>
      <p><b>Description:</b> ${description}</p>
      <p><b>Note:</b> ${adminNote || "No note"}</p>
    `;

    await transporter.sendMail({
      from: `"UAWP Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Request Resolved - UAWP`,
      html
    });

    console.log("Resolution email sent");
  } catch (err) {
    console.log("Resolution email error:", err);
  }
};