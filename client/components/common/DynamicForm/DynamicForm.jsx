import { useMediaQuery } from "react-responsive";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import styles from "./DynamicForm.module.scss";
import Image from "next/image";

const DynamicForm = ({ schema, title, logo }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isFormLess500px = useMediaQuery({ maxWidth: 469 }); // ✅ Column layout for very small screens

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={isMobile ? styles.mobileContactForm : styles.contactForm}>
      {/* ✅ Logo */}
      {logo && (
        <div className={styles.logoWrapper}>
          <Image
            src={logo}
            width={isMobile ? 80 : 100}
            height={isMobile ? 100 : 100}
            alt="Logo"
          />
        </div>
      )}

      {/* ✅ Loop through schema fields */}
      {Object.keys(schema.fields).map((fieldName, index, fields) => {
        const isLastName = fieldName.toLowerCase() === "lastName";
        const isFirstName = fieldName.toLowerCase() === "name";
        const isMessage = fieldName.toLowerCase() === "message";
        const isFullNameRow = isFirstName && fields.includes("lastName");

        // ✅ Render first & last name in a row unless screen is < 500px
        if (isFullNameRow && !isFormLess500px) {
          return (
            <div className={styles.formRow} key="fullNameRow">
              {/* First Name */}
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className={`${styles.inputField} ${errors.firstName ? styles.error : ""}`}
                  placeholder="Enter your first name"
                />
              </div>

              {/* Last Name */}
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
          );
        }

        // ✅ If screen is small (<500px), render Last Name like the others
        if (isLastName && isFormLess500px) {
          return (
            <div className={styles.formGroup} key={index}>
              <label>Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                className={`${styles.inputField} ${errors.lastName ? styles.error : ""}`}
                placeholder="Enter your last name"
              />
            </div>
          );
        }

        // ✅ Render other fields normally (message, email, etc.)
        return (
          !isLastName && (
            <div className={styles.formGroup} key={index}>
              <label>
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              </label>
              {isMessage ? (
                <textarea
                  {...register(fieldName)}
                  className={`${styles.inputField} ${errors[fieldName] ? styles.error : ""}`}
                  placeholder="Enter your message"
                  rows={4}
                  style={{ resize: "none" }}
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
          )
        );
      })}

      {/* ✅ Submit Button */}
      <motion.button
        type="submit"
        className={isMobile ? styles.mobileSubmitButton : styles.submitButton}
        whileTap={{ scale: 0.95 }}>
        <span> {isSubmitting ? "Sending..." : "Send"}</span>
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
