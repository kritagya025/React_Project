import React from "react";

function Contact() {
  return (
    <div className="bg-gray-100 min-h-screen py-10">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
        <p className="text-gray-600 mt-2">
          Have a question or want to collaborate? Let’s talk.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-4">

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Send Message
          </h3>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
<br /><br />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
<br /><br />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
<br /><br />
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Send Message
            </button>

          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Contact Info
          </h3>

          <div className="space-y-3 text-gray-700">
            <p>📧 prajwal@example.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 Greater Noida, India</p>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-blue-600 hover:underline">
                GitHub
              </a>
              <a href="#" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center mt-10 text-gray-500">
        © 2026 DevConnect
      </footer>

    </div>
  );
}

export default Contact;