import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // ✅ Make sure this matches your email provider
  auth: {
    user: process.env.EMAIL_USER, // ✅ Email from your .env.local file
    pass: process.env.EMAIL_PASS, // ✅ App password (not normal password)
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, email, phone, message } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "manumurillo@gmail.com", // ✅ Your receiving email
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

    // ✅ Debugging to check config before sending
    console.log("Mail options:", mailOptions);

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email:", error); // ✅ Log complete error
    res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
}
