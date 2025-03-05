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
            width={isMobile ? 100 : 125}
            height={isMobile ? 100 : 125}
            alt="Logo"
          />
        </div>
      )}

      {/* ✅ Loop through schema fields */}
      {Object.keys(schema.fields).map((fieldName, index, fields) => {
        const isLastName = fieldName.toLowerCase().includes("last");
        const isFirstName = fieldName.toLowerCase().includes("first");
        const isMessage = fieldName.toLowerCase() === "message";
        const isFullNameRow = isFirstName && fields.includes("lastName");

        if (isFullNameRow && !isMobile) {
          return (
            <div
              className={
                isFormLess500px ? styles.columnFormRow : styles.formRow
              } // ✅ Switch to column if screen is <500px
              key="fullNameRow">
              <div
                className={
                  isMobile ? styles.mobileFormGroup : styles.formGroup
                }>
                <label>First Name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  className={
                    isMobile
                      ? `${styles.mobileInputField} ${errors.firstName ? styles.error : ""}`
                      : `${styles.inputField} ${errors.firstName ? styles.error : ""}`
                  }
                  placeholder="Enter your first name"
                />
              </div>

              <div
                className={
                  isMobile ? styles.mobileFormGroup : styles.formGroup
                }>
                <label>Last Name</label>
                <input
                  type="text"
                  {...register("lastName")}
                  className={
                    isMobile
                      ? `${styles.mobileInputField} ${errors.lastName ? styles.error : ""}`
                      : `${styles.inputField} ${errors.lastName ? styles.error : ""}`
                  }
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          );
        }

        return (
          !isLastName && (
            <div
              className={isMobile ? styles.mobileFormGroup : styles.formGroup}
              key={index}>
              <label>
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              </label>
              {isMessage ? (
                <textarea
                  {...register(fieldName)}
                  className={
                    isMobile
                      ? `${styles.mobileInputField} ${errors[fieldName] ? styles.error : ""}`
                      : `${styles.inputField} ${errors[fieldName] ? styles.error : ""}`
                  }
                  placeholder="Enter your message"
                  rows={4}
                  style={{ resize: "none" }}
                />
              ) : (
                <input
                  type="text"
                  {...register(fieldName)}
                  className={
                    isMobile
                      ? `${styles.mobileInputField} ${errors[fieldName] ? styles.error : ""}`
                      : `${styles.inputField} ${errors[fieldName] ? styles.error : ""}`
                  }
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
