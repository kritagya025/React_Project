import { useState } from "react";

function JoinForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/72 px-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="surface-card glass-ring w-full max-w-2xl p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 space-y-3">
          <p className="section-tag">Join the Community</p>
          <h2 className="font-display text-3xl font-bold text-white">
            Find the right builder circle.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            Tell us what you build and the kind of collaborators you want around
            you. We will help you plug into the right momentum.
          </p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="field-input"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="field-input"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="4"
            className="field-input"
            placeholder="What kind of projects or collaborators are you looking for?"
            value={formData.message}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="submit" className="btn-primary">
              Submit
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinForm;
