import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "@styles/pages/contact.module.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Enter name";
    if (!formData.phone.match(/^[0-9\b]+$/))
      newErrors.phone = "Enter valid phone number";
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter a valid email address";

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Form submitted successfully!");
          return response.json();
        } else {
          throw new Error("Form submission failed!");
        }
      })
      .then((data) => {
        console.log("Server response: ", data);
        setFormData({ name: "", phone: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error submitting form: ", error);
      });
  };

  return (
    <div className={styles.contactPage}>
      {/* Animate Content Section */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: -50 }} // Start above
        animate={{ opacity: 1, y: 0 }} // Move to normal position
        transition={{ duration: 1, ease: "easeOut" }}>
        <h2>Contact Us</h2>
        <p>Let’s Get Started!</p>
        <p>
          Ready to transform your architectural ideas into stunning visuals?
        </p>
        <p>Contact us today to discuss how we can bring your vision to life!</p>

        {/* Animate Form Section */}
        <motion.form
          onSubmit={handleSubmit}
          className={styles.contactForm}
          initial={{ opacity: 0, y: 50 }} // Start below
          animate={{ opacity: 1, y: 0 }} // Move to normal position
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`${styles.inputField} ${errors.name ? "error" : ""}`}
            />
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className={`${styles.inputField} ${errors.phone ? "error" : ""}`}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`${styles.inputField} ${errors.email ? "error" : ""}`}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className={styles.inputField}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Send
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
