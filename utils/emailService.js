const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.BREVO_SENDER || 'helpcenteruawp@gmail.com';
const SENDER_NAME = 'UAWP Support';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'helpcenteruawp@gmail.com';
const DASHBOARD_URL = 'https://unified-adapted-web-platform-p28t.vercel.app/';

// ── Core Brevo API sender ─────────────────────────────────────
const sendEmail = async ({ to, toName, subject, html }) => {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: to, name: toName || to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Brevo API error');
  }

  return response.json();
};

// ── 1. User confirmation email ────────────────────────────────
export const sendHelpConfirmationToUser = async ({ name, email, helpType, urgency, description }) => {
  if (!email) return;
  try {
    await sendEmail({
      to: email,
      toName: name,
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
        </div>`,
    });
    console.log('✅ User confirmation email sent to:', email);
  } catch (err) {
    console.error('❌ User email error:', err.message);
  }
};

// ── 2. Admin notification email ───────────────────────────────
export const sendHelpNotificationToAdmin = async ({ name, email, phone, helpType, urgency, description }) => {
  try {
    const urgencyColor = urgency === 'High' ? '#C02020' : urgency === 'Medium' ? '#92600A' : '#157A4A';
    const urgencyBg = urgency === 'High' ? '#FFF0F0' : urgency === 'Medium' ? '#FFF8EC' : '#EDFAF4';
    const urgencyBdr = urgency === 'High' ? '#F47070' : urgency === 'Medium' ? '#F5C842' : '#34C97B';

    await sendEmail({
      to: ADMIN_EMAIL,
      toName: 'UAWP Admin',
      subject: `🚨 [${urgency}] New Help Request — ${name} (${helpType})`,
      html: `
        <div style="font-family:Segoe UI,Arial,sans-serif;max-width:580px;margin:40px auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">
          <div style="background:#1C1612;padding:28px 36px;">
            <div style="font-size:22px;font-weight:800;color:#c2b779;letter-spacing:3px;">UAWP</div>
            <div style="color:rgba(255,255,255,0.45);font-size:11px;margin-top:2px;">Admin Notification</div>
          </div>
          <div style="background:${urgencyBg};border-left:5px solid ${urgencyBdr};padding:14px 24px;font-size:14px;font-weight:700;color:${urgencyColor};">
            🔔 New ${urgency} Priority Help Request
          </div>
          <div style="padding:28px 36px;">
            <h2 style="color:#1C1612;margin:0 0 18px;">New Request from ${name}</h2>
            <div style="background:#F9F9F9;border-radius:12px;padding:4px 20px;margin-bottom:20px;">
              <p style="margin:10px 0;font-size:13.5px;"><b>Name:</b> ${name}</p>
              <p style="margin:10px 0;font-size:13.5px;"><b>Email:</b> ${email}</p>
              <p style="margin:10px 0;font-size:13.5px;"><b>Phone:</b> ${phone || '—'}</p>
              <p style="margin:10px 0;font-size:13.5px;"><b>Help Type:</b> ${helpType}</p>
              <p style="margin:10px 0;font-size:13.5px;"><b>Urgency:</b> <span style="color:${urgencyColor};font-weight:700;">${urgency}</span></p>
            </div>
            <div style="background:#F8F3D9;border-radius:10px;padding:14px 18px;border-left:3px solid #c2b779;margin-bottom:28px;">
              <strong style="font-size:12px;color:#9a8f7e;text-transform:uppercase;letter-spacing:0.8px;">Description</strong>
              <p style="margin:8px 0 0;font-size:13.5px;color:#3f3b23;line-height:1.7;">${description}</p>
            </div>
            <a href="${DASHBOARD_URL}"
               style="display:inline-block;background:#3f3b23;color:#c2b779;text-decoration:none;
                      padding:13px 28px;border-radius:10px;font-weight:700;font-size:14px;
                      letter-spacing:0.5px;">
              🖥️ Open Admin Dashboard →
            </a>
          </div>
          <div style="background:#1C1612;padding:16px 36px;text-align:center;">
            <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">© 2026 UAWP Admin System</p>
          </div>
        </div>`,
    });
    console.log('✅ Admin notification email sent');
  } catch (err) {
    console.error('❌ Admin email error:', err.message);
  }
};

// ── 3. Resolution email to user ───────────────────────────────
export const sendResolutionEmailToUser = async ({ name, email, helpType, description, adminNote }) => {
  if (!email) return;
  try {
    await sendEmail({
      to: email,
      toName: name,
      subject: `✅ Your Help Request Has Been Resolved — UAWP`,
      html: `
        <div style="font-family:Segoe UI,Arial,sans-serif;max-width:560px;margin:40px auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(63,59,35,0.12);">
          <div style="background:linear-gradient(135deg,#157A4A,#1fa864);padding:32px 36px;text-align:center;">
            <div style="font-size:48px;margin-bottom:8px;">✅</div>
            <div style="font-size:22px;font-weight:800;color:rgba(255,255,255,0.9);letter-spacing:3px;">UAWP</div>
            <div style="color:#fff;font-size:18px;font-weight:700;margin-top:10px;">Your Request Has Been Resolved!</div>
          </div>
          <div style="padding:36px;">
            <div style="font-size:20px;font-weight:700;color:#3f3b23;margin-bottom:10px;">Great news, ${name}! 🎉</div>
            <p style="font-size:14px;color:#6b6445;line-height:1.7;">Your help request has been <strong>reviewed and resolved</strong> by our team.</p>
            <div style="background:#EDFAF4;border-radius:12px;padding:20px 24px;border-left:4px solid #34C97B;margin-bottom:24px;">
              <p style="margin:6px 0;font-size:13.5px;"><b>Help Type:</b> ${helpType}</p>
              <p style="margin:6px 0;font-size:13.5px;"><b>Your Request:</b> ${description}</p>
              <p style="margin:6px 0;font-size:13.5px;"><b>Status:</b> ✅ Resolved</p>
            </div>
            ${adminNote ? `
            <div style="background:#f9f9f9;border-radius:10px;padding:16px 20px;border-left:3px solid #c2b779;margin-bottom:24px;">
              <div style="font-size:11px;font-weight:700;color:#9a8f7e;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">📝 Note from our team</div>
              <p style="margin:0;font-size:13.5px;color:#3f3b23;line-height:1.7;">${adminNote}</p>
            </div>` : ''}
            <p style="font-size:14px;color:#6b6445;">Thank you for using UAWP. We're always here for you. 💛</p>
          </div>
          <div style="background:#157A4A;padding:20px 36px;text-align:center;">
            <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:0;">© 2026 UAWP — InclusionHub · Metropolitan University, Sylhet</p>
          </div>
        </div>`,
    });
    console.log('✅ Resolution email sent to:', email);
  } catch (err) {
    console.error('❌ Resolution email error:', err.message);
  }
};