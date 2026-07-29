import { Resend } from "resend";
import type { ContactPayload } from "@/lib/contact-validation";

const apiKey = process.env.RESEND_API_KEY;

function getResend(): Resend {
  if (!apiKey) {
    throw new Error(
      "Resend is not configured. Set RESEND_API_KEY in .env.local",
    );
  }
  return new Resend(apiKey);
}

export async function sendOtpEmail(
  to: string,
  otp: string,
  name: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Mantu Yadav <noreply@mantuyadav.dev>",
      to,
      subject: "Verify your email — Mantu Yadav Portfolio",
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9f9f9;margin:0;padding:0">
<div style="max-width:480px;margin:40px auto;background:#fff;border-radius:12px;padding:40px">
<div style="text-align:center;margin-bottom:24px"><span style="font-size:24px">✉️</span></div>
<h1 style="font-size:24px;font-weight:600;text-align:center;color:#111827;margin:0">Verify your email</h1>
<p style="color:#374151;font-size:16px;line-height:1.6;text-align:center">Hi ${name},<br><br>Your verification code is:</p>
<div style="font-size:36px;font-weight:700;letter-spacing:8px;text-align:center;color:#7c3aed;margin:32px 0;font-family:'Courier New',monospace">${otp}</div>
<p style="color:#374151;font-size:16px;line-height:1.6;text-align:center">This code expires in <strong>10 minutes</strong>.</p>
<p style="color:#6b7280;font-size:14px;text-align:center">If you did not submit the contact form, you can ignore this email.</p>
<div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center"><p>Mantu Yadav — Portfolio</p></div>
</div>
</body>
</html>`,
    });
    return { success: true };
  } catch (err) {
    console.error("sendOtpEmail error:", err);
    return { success: false, error: "Couldn't send the verification email. Please try again." };
  }
}

export async function sendContactMessage(
  payload: ContactPayload,
  verifiedAt: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResend();
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Mantu Yadav <noreply@mantuyadav.dev>",
      to: process.env.CONTACT_EMAIL || "",
      replyTo: payload.email,
      subject: `Portfolio Contact: ${payload.subject}`,
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9f9f9;margin:0;padding:0">
<div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;padding:40px">
<div style="display:inline-block;background:#d1fae5;color:#065f46;font-size:12px;font-weight:600;padding:4px 12px;border-radius:20px;margin-bottom:16px">✓ Email Verified</div>
<h1 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 20px">New Contact Form Submission</h1>
<div style="margin-bottom:16px"><div style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Name</div><div style="font-size:16px;color:#111827">${payload.name}</div></div>
<div style="margin-bottom:16px"><div style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Email</div><div style="font-size:16px;color:#111827">${payload.email} (verified)</div></div>
<div style="margin-bottom:16px"><div style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Subject</div><div style="font-size:16px;color:#111827">${payload.subject}</div></div>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
<div style="margin-bottom:16px"><div style="font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Message</div><div style="font-size:16px;color:#111827">${payload.message.replace(/\n/g, "<br>")}</div></div>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
<div style="font-size:12px;color:#9ca3af"><p>Verified at: ${verifiedAt}</p></div>
</div>
</body>
</html>`,
    });
    return { success: true };
  } catch (err) {
    console.error("sendContactMessage error:", err);
    return { success: false, error: "Couldn't send your message. Please try again." };
  }
}
