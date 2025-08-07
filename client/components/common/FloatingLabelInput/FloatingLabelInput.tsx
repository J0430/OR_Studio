// components/forms/FloatingLabelInput.tsx
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./FloatingLabelInput.module.scss";
import { FieldDefinition } from "./FloatingLabelInput.type";

interface BaseProps {
  /** Validation error message for this field (if any) */
  error?: string;
  /** Disabled state (e.g., when form is submitting) */
  disabled?: boolean;
}

type FloatingLabelInputProps<TFieldValues extends FieldValues> = BaseProps &
  FieldDefinition & {
    /** Register from RHF, typed to the same form */
    register: UseFormRegister<TFieldValues>;
    /** Name is strongly typed to your form keys */
    name: Path<TFieldValues>;
  };

export function FloatingLabelInput<TFieldValues extends FieldValues>({
  name,
  label,
  type,
  placeholder,
  rows,
  register,
  disabled,
  error,
}: FloatingLabelInputProps<TFieldValues>) {
  const isTextArea = type === "textarea";
  const inputId = `fld_${name}`;

  return (
    <div
      className={`${styles.floatingLabelInput} ${error !== "" && styles.error}`}>
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

      <label htmlFor={inputId}>{label}</label>

      {error && (
        <p id={`${inputId}-error`} className={styles.errorText} role="alert">
          {error && error}{" "}
        </p>
      )}
    </div>
  );
}
