import React from "react";
import "../Styles/Contact.css";

function Contact() {
  return (
    <div className="contact-page page-shell">
      <section className="contact-hero page-fade page-fade-1">
        <div className="section-tag page-fade page-fade-1">Contact</div>
        <h1 className="page-fade page-fade-2">Let&apos;s talk about collaboration.</h1>
        <p>
          Have a question, an idea, or a partnership in mind? Reach out and we
          will help you find the right starting point.
        </p>
      </section>

      <div className="contact-grid page-fade page-fade-3">
        <section className="contact-card">
          <h2>Send Message</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea rows="6" placeholder="Your Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>

        <section className="contact-card contact-card-info">
          <h2>Contact Info</h2>
          <div className="contact-info-list">
            <p>
              <strong>Email</strong>
              <span>user@example.com</span>
            </p>
            <p>
              <strong>Phone</strong>
              <span>+91 86598-XXXXX</span>
            </p>
            <p>
              <strong>Location</strong>
              <span>Greater Noida, India</span>
            </p>
          </div>

          <div className="contact-socials">
            <h3>Follow Us</h3>
            <div>
              <a href="#">GitHub</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </section>
      </div>

      <footer className="contact-footer page-fade page-fade-4">© 2026 DevConnect</footer>
    </div>
  );
}

export default Contact;
