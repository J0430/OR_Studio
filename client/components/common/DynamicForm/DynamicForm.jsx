import { useMediaQuery } from "react-responsive";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import styles from "./DynamicForm.module.scss";
import Image from "next/image";

const DynamicForm = ({ schema, title, logo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const isMobile = useMediaQuery({ maxDeviceWidth: 768 });
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setServerError("");
    setSuccess(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setSuccess(true);
      reset();
    } catch (err) {
      console.error("Submission error:", err);
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
      {/* ✅ Logo */}
      {logo && (
        <div className={styles.logoWrapper}>
          <Image
            src={logo}
            width={isMobile ? 80 : 100}
            height={isMobile ? 80 : 100}
            alt="Logo"
          />
        </div>
      )}

      {/* ✅ First Name & Last Name in a Row */}
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>First Name</label>
          <input
            type="text"
            {...register("firstName")}
            className={`${styles.inputField} ${errors.firstName ? styles.error : ""}`}
            placeholder="Enter your first name"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            className={`${styles.inputField} ${errors.lastName ? styles.error : ""}`}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      {/* ✅ Other Fields (Excluding First & Last Name) */}
      {Object.keys(schema.fields)
        .filter((field) => field !== "firstName" && field !== "lastName") // ❌ Prevent duplicate "Name" input
        .map((fieldName, index) => {
          const isMessage = fieldName.toLowerCase() === "message";

          return (
            <div className={styles.formGroup} key={index}>
              <label>
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              </label>
              {isMessage ? (
                <textarea
                  {...register(fieldName)}
                  className={`${styles.inputField} ${errors[fieldName] ? styles.error : ""}`}
                  placeholder="Enter your message"
                  rows={isMobile ? 2 : 3}
                />
              ) : (
                <input
                  type="text"
                  {...register(fieldName)}
                  className={`${styles.inputField} ${errors[fieldName] ? styles.error : ""}`}
                  placeholder={`Enter your ${fieldName.toLowerCase()}`}
                />
              )}
            </div>
          );
        })}

      {/* ✅ Submit Button */}
      <motion.button
        type="submit"
        className={styles.submitButton}
        whileTap={{ scale: 0.95 }}>
        <span>{isSubmitting ? "Sending..." : "Send"}</span>
      </motion.button>

      {/* ✅ Server Error Handling */}
      {serverError && <p className={styles.errorMessage}>{serverError}</p>}

      {/* ✅ Success Message */}
      {success && (
        <p className={styles.successMessage}>Message sent successfully!</p>
      )}
    </form>
  );
};

export default DynamicForm;
