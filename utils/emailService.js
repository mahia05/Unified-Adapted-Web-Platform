import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ── 1. Email to USER when they submit a help request ─────────
export const sendHelpConfirmationToUser = async ({ name, email, helpType, urgency, description }) => {
  try {
    console.log("User email sending...");

    await resend.emails.send({
      from: 'UAWP Support <onboarding@resend.dev>',
      to: email,
      subject: `✅ Help Request Received — ${helpType} (${urgency} Priority)`,
      html: `
            <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:40px auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(63,59,35,0.12);">
              <div style="background:#3f3b23;padding:32px 36px;text-align:center;">
                <div style="font-size:26px;font-weight:800;color:#c2b779;letter-spacing:3px;">UAWP</div>
                <div style="color:rgba(235,229,194,0.6);font-size:12px;margin-top:4px;">Unified Adaptive Web Platform</div>
              </div>
              <div style="padding:36px;">
                <div style="font-size:20px;font-weight:700;color:#3f3b23;margin-bottom:10px;">Hello, ${name}! 👋</div>
                <p style="font-size:14px;color:#6b6445;line-height:1.7;">We've received your help request and our team will review it shortly. You can expect a response within <strong>24–48 hours</strong>.</p>
                <div style="background:#F8F3D9;border-radius:12px;padding:20px 24px;border-left:4px solid #c2b779;margin-bottom:24px;">
                  <p style="margin:6px 0;font-size:13.5px;"><strong>Help Type:</strong> ${helpType}</p>
                  <p style="margin:6px 0;font-size:13.5px;"><strong>Urgency:</strong> ${urgency}</p>
                  <p style="margin:6px 0;font-size:13.5px;"><strong>Status:</strong> ⏳ Pending Review</p>
                  <p style="margin:6px 0;font-size:13.5px;"><strong>Your Request:</strong> ${description}</p>
                </div>
                <p style="font-size:14px;color:#6b6445;">Thank you for trusting UAWP. We're here for you. 💛</p>
              </div>
              <div style="background:#3f3b23;padding:20px 36px;text-align:center;">
                <p style="color:rgba(235,229,194,0.45);font-size:11px;margin:0;">© 2026 UAWP — InclusionHub · Metropolitan University, Sylhet</p>
              </div>
            </div>`
    });

    console.log("User email sent");

  } catch (err) {
    console.log("User email error:", err);
  }
};


// ── 2. Email to ADMIN when a new help request comes in ───────
export const sendHelpNotificationToAdmin = async ({ name, email, phone, helpType, urgency, description }) => {
  try {
    console.log("Admin email sending...");

    // ✅ FIX: safe fallback + debug check
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.log("❌ ADMIN_EMAIL is missing in .env");
      return;
    }

    console.log("ADMIN EMAIL =", adminEmail);

    await resend.emails.send({
      from: 'UAWP System <onboarding@resend.dev>',
      to: adminEmail,
      subject: `🚨 [${urgency}] New Help Request — ${name} (${helpType})`,
      html: `
            <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:40px auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">
              <div style="background:#1C1612;padding:28px 36px;">
                <div style="font-size:22px;font-weight:800;color:#c2b779;letter-spacing:3px;">UAWP</div>
                <div style="color:rgba(255,255,255,0.45);font-size:11px;margin-top:2px;">Admin Notification</div>
              </div>

              <div style="background:${urgency === 'High' ? '#FFF0F0' : urgency === 'Medium' ? '#FFF8EC' : '#EDFAF4'};border-left:5px solid ${urgency === 'High' ? '#F47070' : urgency === 'Medium' ? '#F5C842' : '#34C97B'};padding:14px 24px;font-size:14px;font-weight:700;color:${urgency === 'High' ? '#C02020' : urgency === 'Medium' ? '#92600A' : '#157A4A'};">
                🔔 New ${urgency} Priority Help Request
              </div>

              <div style="padding:28px 36px;">
                <h2 style="color:#1C1612;margin-bottom:18px;">New Request from ${name}</h2>

                <div style="background:#F9F9F9;border-radius:12px;padding:4px 20px;margin-bottom:20px;">
                  <p><b>Name:</b> ${name}</p>
                  <p><b>Email:</b> ${email}</p>
                  <p><b>Phone:</b> ${phone || '—'}</p>
                  <p><b>Help Type:</b> ${helpType}</p>
                  <p><b>Urgency:</b> ${urgency}</p>
                </div>

                <div style="background:#F8F3D9;border-radius:10px;padding:14px 18px;border-left:3px solid #c2b779;">
                  <strong>Description:</strong><br>${description}
                </div>
              </div>

              <div style="background:#1C1612;padding:16px 36px;text-align:center;">
                <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">© 2026 UAWP Admin System</p>
              </div>
            </div>`
    });

    console.log("Admin email sent");

  } catch (err) {
    console.log("Admin email error:", err);
  }
};


// ── 3. Email to USER when request is RESOLVED ────────────────
export const sendResolutionEmailToUser = async ({ name, email, helpType, description, adminNote }) => {
  try {
    console.log("Resolution email sending...");

    await resend.emails.send({
      from: 'UAWP Support <onboarding@resend.dev>',
      to: email,
      subject: `Your Help Request Has Been Resolved — UAWP`,
      html: `
            <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:40px auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(63,59,35,0.12);">
              <div style="background:linear-gradient(135deg,#157A4A,#1fa864);padding:32px 36px;text-align:center;">
                <div style="font-size:48px;margin-bottom:8px;">✅</div>
                <div style="font-size:22px;font-weight:800;color:rgba(255,255,255,0.9);letter-spacing:3px;">UAWP</div>
                <div style="color:#fff;font-size:18px;font-weight:700;margin-top:10px;">Your Request Has Been Resolved!</div>
              </div>

              <div style="padding:36px;">
                <div style="font-size:20px;font-weight:700;color:#3f3b23;margin-bottom:10px;">Great news, ${name}! 🎉</div>

                <p style="font-size:14px;color:#6b6445;line-height:1.7;">Your help request has been <strong>reviewed and resolved</strong>.</p>

                <div style="background:#EDFAF4;border-radius:12px;padding:20px 24px;border-left:4px solid #34C97B;margin-bottom:24px;">
                  <p><b>Help Type:</b> ${helpType}</p>
                  <p><b>Description:</b> ${description}</p>
                  <p><b>Status:</b> ✅ Resolved</p>
                </div>

                ${adminNote ? `<div style="background:#f9f9f9;padding:16px;border-left:3px solid #c2b779;">${adminNote}</div>` : ''}

                <p>Thank you for using UAWP 💛</p>
              </div>

              <div style="background:#157A4A;padding:20px 36px;text-align:center;">
                <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:0;">© 2026 UAWP</p>
              </div>
            </div>`
    });

    console.log("Resolution email sent");

  } catch (err) {
    console.log("Resolution email error:", err);
  }
};