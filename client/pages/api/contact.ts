import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { firstName, lastName, email, message } = req.body || {};
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log(req.body);
  const name = `${firstName} ${lastName}`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, // STARTTLS on 587
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!, // <-- App Password
      },
    });

    await transporter.sendMail({
      from: `"OR Studio" <${process.env.EMAIL_USER}>`, // must be the authenticated sender
      to: process.env.EMAIL_USER, // where you receive the message
      replyTo: `${name} <${email}>`, // user’s email for replies
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h3>New Message from OR Studio Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("❌ Email sending failed:", err);
    return res.status(500).json({
      error: err?.response || err?.message || "Error sending email",
    });
  }
}
