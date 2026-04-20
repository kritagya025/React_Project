import ContactMessage from "../models/ContactMessage.js";

/**
 * POST /api/contact
 */
export async function createContactMessage(req, res) {
  try {
    const name = String(req.body.name ?? "").trim();
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const message = String(req.body.message ?? "").trim();

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    await ContactMessage.create({ name, email, message });

    res.status(201).json({ message: "Message sent successfully. We'll get back to you soon!" });
  } catch (error) {
    console.error("Contact message error:", error);
    res.status(500).json({ error: "Could not send message." });
  }
}
