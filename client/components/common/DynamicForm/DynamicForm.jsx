import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import styles from "./DynamicForm.module.scss";
import Image from "next/image";

const DynamicForm = ({ schema, title, logo }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
      {/* ✅ Logo */}
      {logo && (
        <div className={styles.logoWrapper}>
          <Image src={logo} width={125} height={125} alt="Logo" />
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
            <div className={styles.formRow} key={index}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  className={`${styles.inputField} ${errors.firstName ? styles.error : ""}`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <span className={styles.errorMessage}>
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input
                  type="text"
                  {...register("lastName")}
                  className={`${styles.inputField} ${errors.lastName ? styles.error : ""}`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <span className={styles.errorMessage}>
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
          );
        }

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
              {errors[fieldName] && (
                <span className={styles.errorMessage}>
                  {errors[fieldName].message}
                </span>
              )}
            </div>
          )
        );
      })}

      {/* ✅ Submit Button */}
      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}>
        {isSubmitting ? "Sending..." : "Send"}
      </motion.button>
    </form>
  );
};

export default DynamicForm;
