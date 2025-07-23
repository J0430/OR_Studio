// components/forms/FloatingLabelInput.tsx

import React from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "./FloatingLabelInput.module.scss";
import { FieldDefinition } from "./FloatingLabelInput.type";

interface FloatingLabelInputProps extends FieldDefinition {
  /** Register function from react-hook-form useForm */
  register: UseFormRegister<any>;
  /** Validation error message for this field (if any) */
  error?: string;
  /** Disabled state (e.g., when form is submitting) */
  disabled?: boolean;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  name,
  label,
  type,
  placeholder,
  rows,
  register,
  error,
  disabled,
}) => {
  // Determine if we should use a textarea or a standard input
  const isTextArea = type === "textarea";
  // Ensure an id is available for accessibility (using name as id)
  const inputId = `fld_${name}`;

  return (
    <div
      className={`${styles.floatingLabelInput} ${error ? styles.error : ""}`}>
      {/** Render either a textarea or input based on type */}
      {isTextArea ? (
        <textarea
          id={inputId}
          {...register(name)}
          placeholder={placeholder || " "}
          rows={rows || 3}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          {...register(name)}
          placeholder={placeholder || " "}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      )}
      {/** The label will float when input is focused or filled */}
      <label htmlFor={inputId}>{label}</label>

      {/** Error message for this field, announced to screen readers */}
      {error && (
        <p id={`${inputId}-error`} className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
