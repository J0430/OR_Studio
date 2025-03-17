import nodemailer from "nodemailer";

// ✅ Create Transporter with your email configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // You can replace 'gmail' with 'hotmail', 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password (better to use App Passwords or OAuth2)
  },
});

// ✅ API Route handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, email, phone, message } = req.body;

  try {
    // ✅ Prepare Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "yourdestinationemail@example.com", // Change this to where you want to receive emails
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
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // ✅ Send Email
    await transporter.sendMail(mailOptions);

    // ✅ Success Response
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Failed to send email", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
}
