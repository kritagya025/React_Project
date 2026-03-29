import { useState } from "react";

function JoinForm({ onClose }) {
      const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };
    const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setFormData({ name: "", email: "", message: "" });

    onClose(); 
  };
    return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Join Our Community</h2>

        <form onSubmit={handleSubmit}></form>
                  <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />          <button type="submit">Submit</button>

          <button type="button" onClick={onClose}>
            Cancel
          </button>
                </div>
    </div>
  );
}

export default JoinForm;