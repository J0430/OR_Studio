import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./DynamicForm.module.scss";

// 🧠 Utility to split camelCase into "First name", "Phone number", etc.
const formatFieldLabel = (fieldName) => {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const DynamicForm = ({ schema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to send message");
      }

      setSuccess(true);
      reset();
    } catch (err) {
      console.error("❌ Submission error:", err);
      setServerError("Something went wrong. Please try again.");
    }
  };

  const renderLabel = (fieldName) => (
    <label>
      {formatFieldLabel(fieldName)} <span className={styles.required}>*</span>
    </label>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
      {/* ✅ First + Last Name Row */}
      <div className={styles.formRow}>
        {["firstName", "lastName"].map((field) => (
          <div className={styles.formGroup} key={field}>
            {renderLabel(field)}
            <input
              type="text"
              {...register(field)}
              onBlur={() => trigger(field)}
              className={`
                ${styles.inputField}
                ${touchedFields[field] && !errors[field] ? styles.valid : ""}
                ${errors[field] ? styles.error : ""}
              `}
              placeholder={formatFieldLabel(field)}
            />
            {errors[field] && (
              <p className={styles.errorText}>{errors[field].message}</p>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Other Fields */}
      {Object.keys(schema.fields)
        .filter((field) => !["firstName", "lastName"].includes(field))
        .map((field) => {
          const isMessage = field.toLowerCase() === "message";

          return (
            <div className={styles.formGroup} key={field}>
              {renderLabel(field)}

              {isMessage ? (
                <textarea
                  {...register(field)}
                  onBlur={() => trigger(field)}
                  className={`
                    ${styles.inputField}
                    ${touchedFields[field] && !errors[field] ? styles.valid : ""}
                    ${errors[field] ? styles.error : ""}
                  `}
                  placeholder="Write your message"
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  {...register(field)}
                  onBlur={() => trigger(field)}
                  className={`
                    ${styles.inputField}
                    ${touchedFields[field] && !errors[field] ? styles.valid : ""}
                    ${errors[field] ? styles.error : ""}
                  `}
                  placeholder={formatFieldLabel(field)}
                />
              )}

              {errors[field] && (
                <p className={styles.errorText}>{errors[field].message}</p>
              )}
            </div>
          );
        })}

      {/* ✅ Submit Button */}
      <motion.button
        type="submit"
        className={styles.submitButton}
        whileTap={{ scale: 0.95 }}
        disabled={isSubmitting}>
        <span>{isSubmitting ? "Sending..." : "Send"}</span>
      </motion.button>

      {/* ✅ Status Feedback */}
      {serverError && <p className={styles.errorMessage}>{serverError}</p>}
      {success && (
        <p className={styles.successMessage}>Message sent successfully!</p>
      )}
    </form>
  );
};

export default DynamicForm;
