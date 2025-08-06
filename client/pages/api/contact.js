// pages/api/contact.ts

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "manumurillo@gmail.com",
    subject: `New Contact Form Submission from ${firstName} ${lastName}`,
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
    html: `
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email failed:", error);
    return res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
}
