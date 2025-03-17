import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./DynamicForm.module.scss";
import Image from "next/image";

const DynamicForm = ({ schema, title, logo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    reset,
    trigger, // ✅ Trigger validation onBlur
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

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

  const renderLabel = (fieldName) => (
    <label>
      {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}{" "}
      <span className={styles.required}>*</span>
    </label>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
      {logo && (
        <div className={styles.logoWrapper}>
          <Image src={logo} width={100} height={100} alt="Logo" />
        </div>
      )}

      {/* ✅ First + Last Name Row */}
      <div className={styles.formRow}>
        {["firstName", "lastName"].map((field, index) => (
          <div className={styles.formGroup} key={index}>
            {renderLabel(field)}
            <input
              type="text"
              {...register(field)}
              onBlur={() => trigger(field)} // ✅ Trigger validation on blur
              className={`
                ${styles.inputField}
                ${touchedFields[field] && !errors[field] ? styles.valid : ""}
                ${errors[field] ? styles.error : ""}
              `}
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}
      </div>

      {/* ✅ Other Fields */}
      {Object.keys(schema.fields)
        .filter((field) => !["firstName", "lastName"].includes(field))
        .map((field, index) => {
          const isMessage = field.toLowerCase() === "message";
          return (
            <div className={styles.formGroup} key={index}>
              {renderLabel(field)}
              {isMessage ? (
                <textarea
                  {...register(field)}
                  onBlur={() => trigger(field)} // ✅ Trigger validation on blur
                  className={`
                    ${styles.inputField}
                    ${touchedFields[field] && !errors[field] ? styles.valid : ""}
                    ${errors[field] ? styles.error : ""}
                  `}
                  placeholder="Enter your message"
                  rows={3}
                />
              ) : (
                <input
                  type="text"
                  {...register(field)}
                  onBlur={() => trigger(field)} // ✅ Trigger validation on blur
                  className={`
                    ${styles.inputField}
                    ${touchedFields[field] && !errors[field] ? styles.valid : ""}
                    ${errors[field] ? styles.error : ""}
                  `}
                  placeholder={`Enter your ${field}`}
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

      {/* ✅ Errors and Success */}
      {serverError && <p className={styles.errorMessage}>{serverError}</p>}
      {success && (
        <p className={styles.successMessage}>Message sent successfully!</p>
      )}
    </form>
  );
};

export default DynamicForm;
