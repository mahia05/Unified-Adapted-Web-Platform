import nodemailer from "nodemailer";

// ── Transporter ──────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,   // your Gmail address
        pass: process.env.GMAIL_PASS    // Gmail App Password (not your real password)
    }
});

// ── 1. Email to USER when they submit a help request ─────────
export const sendHelpConfirmationToUser = async ({ name, email, helpType, urgency, description }) => {
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
        .tagline { color: rgba(235,229,194,0.6); font-size: 12px; margin-top: 4px; letter-spacing: 1px; }
        .body { padding: 36px; }
        .greeting { font-size: 20px; font-weight: 700; color: #3f3b23; margin-bottom: 10px; }
        .text { font-size: 14px; color: #6b6445; line-height: 1.7; margin-bottom: 24px; }
        .card { background: #F8F3D9; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; border-left: 4px solid #c2b779; }
        .card-row { display: flex; justify-content: space-between; padding: 7px 0; border-bottom: 1px solid rgba(63,59,35,0.08); font-size: 13.5px; }
        .card-row:last-child { border-bottom: none; }
        .card-lbl { color: #9a8f7e; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; padding-top: 1px; }
        .card-val { color: #3f3b23; font-weight: 500; text-align: right; max-width: 280px; }
        .urgency-high { color: #c02020; font-weight: 700; }
        .urgency-medium { color: #92600A; font-weight: 700; }
        .urgency-low { color: #157A4A; font-weight: 700; }
        .status-pill { display: inline-block; background: #FFF8EC; color: #92600A; border: 1px solid #F5C842; border-radius: 20px; padding: 4px 14px; font-size: 12px; font-weight: 700; }
        .footer { background: #3f3b23; padding: 20px 36px; text-align: center; }
        .footer p { color: rgba(235,229,194,0.45); font-size: 11px; margin: 0; line-height: 1.8; }
        .footer a { color: #c2b779; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="header">
          <div class="logo">UAWP</div>
          <div class="tagline">Unified Adaptive Web Platform</div>
        </div>
        <div class="body">
          <div class="greeting">Hello, ${name}! 👋</div>
          <p class="text">
            We've received your help request and our team will review it shortly.
            You can expect a response within <strong>24–48 hours</strong>.
            Here's a summary of what you submitted:
          </p>
          <div class="card">
            <div class="card-row">
              <span class="card-lbl">Help Type</span>
              <span class="card-val">${helpType}</span>
            </div>
            <div class="card-row">
              <span class="card-lbl">Urgency</span>
              <span class="card-val urgency-${urgency.toLowerCase()}">${urgency}</span>
            </div>
            <div class="card-row">
              <span class="card-lbl">Status</span>
              <span class="card-val"><span class="status-pill">⏳ Pending Review</span></span>
            </div>
            <div class="card-row">
              <span class="card-lbl">Your Request</span>
              <span class="card-val">${description}</span>
            </div>
          </div>
          <p class="text">
            We'll notify you via email when our team reviews or resolves your request.
            Thank you for trusting UAWP. We're here for you. 💛
          </p>
        </div>
        <div class="footer">
          <p>© 2026 UAWP — InclusionHub · Metropolitan University, Sylhet<br>
          <a href="mailto:${process.env.GMAIL_USER}">Contact Support</a></p>
        </div>
      </div>
    </body>
    </html>`;

    await transporter.sendMail({
        from: `"UAWP Support" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `✅ Help Request Received — ${helpType} (${urgency} Priority)`,
        html
    });
};

// ── 2. Email to ADMIN when a new help request comes in ───────
export const sendHelpNotificationToAdmin = async ({ name, email, phone, helpType, urgency, description }) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f0f0; margin: 0; padding: 0; }
        .wrap { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.10); }
        .header { background: #1C1612; padding: 28px 36px; display: flex; align-items: center; gap: 14px; }
        .header-logo { font-size: 22px; font-weight: 800; color: #c2b779; letter-spacing: 3px; }
        .header-tag { color: rgba(255,255,255,0.45); font-size: 11px; margin-top: 2px; }
        .alert-bar { background: ${urgency === 'High' ? '#FFF0F0' : urgency === 'Medium' ? '#FFF8EC' : '#EDFAF4'}; 
                     border-left: 5px solid ${urgency === 'High' ? '#F47070' : urgency === 'Medium' ? '#F5C842' : '#34C97B'};
                     padding: 14px 24px; font-size: 14px; font-weight: 700;
                     color: ${urgency === 'High' ? '#C02020' : urgency === 'Medium' ? '#92600A' : '#157A4A'}; }
        .body { padding: 28px 36px; }
        .title { font-size: 18px; font-weight: 700; color: #1C1612; margin-bottom: 18px; }
        .info-grid { background: #F9F9F9; border-radius: 12px; padding: 4px 20px; margin-bottom: 20px; }
        .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13.5px; gap: 16px; }
        .info-row:last-child { border-bottom: none; }
        .lbl { color: #999; font-weight: 600; font-size: 11px; text-transform: uppercase; min-width: 90px; padding-top: 2px; }
        .val { color: #1C1612; font-weight: 500; flex: 1; }
        .desc-box { background: #F8F3D9; border-radius: 10px; padding: 14px 18px; font-size: 13px; color: #3f3b23; line-height: 1.7; margin-bottom: 20px; border-left: 3px solid #c2b779; }
        .btn { display: inline-block; background: #3f3b23; color: #c2b779; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; }
        .footer { background: #1C1612; padding: 16px 36px; text-align: center; }
        .footer p { color: rgba(255,255,255,0.3); font-size: 11px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="header">
          <div>
            <div class="header-logo">UAWP</div>
            <div class="header-tag">Admin Notification</div>
          </div>
        </div>
        <div class="alert-bar">🔔 New ${urgency} Priority Help Request</div>
        <div class="body">
          <div class="title">New Request from ${name}</div>
          <div class="info-grid">
            <div class="info-row"><span class="lbl">Name</span><span class="val">${name}</span></div>
            <div class="info-row"><span class="lbl">Email</span><span class="val">${email}</span></div>
            <div class="info-row"><span class="lbl">Phone</span><span class="val">${phone || '—'}</span></div>
            <div class="info-row"><span class="lbl">Help Type</span><span class="val">${helpType}</span></div>
            <div class="info-row"><span class="lbl">Urgency</span><span class="val">${urgency}</span></div>
          </div>
          <div class="desc-box"><strong>Description:</strong><br>${description}</div>
          <a href="http://localhost:5000/app/admin/pages/dashboard.html" class="btn">View in Admin Dashboard →</a>
        </div>
        <div class="footer"><p>© 2026 UAWP Admin System</p></div>
      </div>
    </body>
    </html>`;

    await transporter.sendMail({
        from: `"UAWP System" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,  // admin email = same Gmail
        subject: `🚨 [${urgency}] New Help Request — ${name} (${helpType})`,
        html
    });
};

// ── 3. Email to USER when request is RESOLVED ────────────────
export const sendResolutionEmailToUser = async ({ name, email, helpType, description, adminNote }) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #F8F3D9; margin: 0; padding: 0; }
        .wrap { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 32px rgba(63,59,35,0.12); }
        .header { background: linear-gradient(135deg, #157A4A, #1fa864); padding: 32px 36px 24px; text-align: center; }
        .check { font-size: 48px; margin-bottom: 8px; }
        .logo { font-size: 22px; font-weight: 800; color: rgba(255,255,255,0.9); letter-spacing: 3px; }
        .header-title { color: #fff; font-size: 18px; font-weight: 700; margin-top: 10px; }
        .body { padding: 36px; }
        .greeting { font-size: 20px; font-weight: 700; color: #3f3b23; margin-bottom: 10px; }
        .text { font-size: 14px; color: #6b6445; line-height: 1.7; margin-bottom: 24px; }
        .resolved-card { background: #EDFAF4; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; border-left: 4px solid #34C97B; }
        .resolved-title { font-size: 13px; font-weight: 700; color: #157A4A; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }
        .card-row { display: flex; gap: 12px; padding: 7px 0; border-bottom: 1px solid rgba(20,122,74,0.1); font-size: 13.5px; }
        .card-row:last-child { border-bottom: none; }
        .card-lbl { color: #68a888; font-weight: 600; font-size: 11px; text-transform: uppercase; min-width: 85px; padding-top: 1px; }
        .card-val { color: #1C1612; font-weight: 500; flex: 1; }
        .note-box { background: #f9f9f9; border-radius: 10px; padding: 16px 20px; font-size: 13.5px; color: #3f3b23; line-height: 1.7; border-left: 3px solid #c2b779; margin-bottom: 24px; }
        .note-label { font-size: 11px; font-weight: 700; color: #9a8f7e; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
        .footer { background: #157A4A; padding: 20px 36px; text-align: center; }
        .footer p { color: rgba(255,255,255,0.5); font-size: 11px; margin: 0; line-height: 1.8; }
        .footer a { color: rgba(255,255,255,0.8); text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="wrap">
        <div class="header">
          <div class="check">✅</div>
          <div class="logo">UAWP</div>
          <div class="header-title">Your Request Has Been Resolved!</div>
        </div>
        <div class="body">
          <div class="greeting">Great news, ${name}! 🎉</div>
          <p class="text">
            Your help request has been <strong>reviewed and resolved</strong> by our team.
            We hope the support we provided was helpful. Here are the details:
          </p>
          <div class="resolved-card">
            <div class="resolved-title">✔ Resolved Request</div>
            <div class="card-row">
              <span class="card-lbl">Help Type</span>
              <span class="card-val">${helpType}</span>
            </div>
            <div class="card-row">
              <span class="card-lbl">Your Request</span>
              <span class="card-val">${description}</span>
            </div>
            <div class="card-row">
              <span class="card-lbl">Status</span>
              <span class="card-val" style="color:#157A4A;font-weight:700;">✅ Resolved</span>
            </div>
          </div>
          ${adminNote ? `
          <div class="note-box">
            <div class="note-label">📝 Note from our team</div>
            ${adminNote}
          </div>` : ''}
          <p class="text">
            If you need further assistance or have any questions, please don't hesitate to reach out.
            We're always here to help. Thank you for using UAWP! 💛
          </p>
        </div>
        <div class="footer">
          <p>© 2026 UAWP — InclusionHub · Metropolitan University, Sylhet<br>
          <a href="mailto:${process.env.GMAIL_USER}">Contact Support</a></p>
        </div>
      </div>
    </body>
    </html>`;

    await transporter.sendMail({
        from: `"UAWP Support" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `✅ Your Help Request Has Been Resolved — UAWP`,
        html
    });
};