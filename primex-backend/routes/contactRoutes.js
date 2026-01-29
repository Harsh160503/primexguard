const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // Save to DB
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Admin email
    await transporter.sendMail({
      from: `"Primex Guard Website" <${process.env.EMAIL_USER}>`,
      to: "info@primexguardpc.com",
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    // Auto-reply
    await transporter.sendMail({
      from: `"Primex Guard" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message - Primex Guard",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for contacting Primex Guard Pest Control.</p>
        <p>Our team will get back to you shortly.</p>
        <br>
        <p>📞 +91 74950 50483</p>
        <p>Primex Guard Team</p>
      `
    });

    res.json({ success: true });

  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;