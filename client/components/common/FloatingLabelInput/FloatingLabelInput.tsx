// components/forms/FloatingLabelInput.tsx
import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./FloatingLabelInput.module.scss";
import { FieldDefinition } from "./FloatingLabelInput.type";

interface BaseProps {
  error?: string;
  disabled?: boolean;
}

type FloatingLabelInputProps<TFieldValues extends FieldValues> = BaseProps &
  FieldDefinition & {
    register: UseFormRegister<TFieldValues>;
    name: Path<TFieldValues>;
  };

export function FloatingLabelInput<TFieldValues extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  rows,
  register,
  error,
  disabled,
  autoComplete,
  inputMode,
}: FloatingLabelInputProps<TFieldValues>) {
  const isTextArea = type === "textarea";
  const inputId = `fld_${name}`;
  const hasVisibleError = Boolean(error);

  // sensible defaults by field name
  const n = String(name).toLowerCase();
  const defaultAutoComplete =
    autoComplete ??
    (n.includes("first")
      ? "given-name"
      : n.includes("last")
        ? "family-name"
        : n.includes("email")
          ? "email"
          : n.includes("phone")
            ? "tel"
            : n.includes("message")
              ? "off"
              : "on");

  const defaultInputMode =
    inputMode ??
    (type === "tel" || n.includes("phone")
      ? "tel"
      : type === "email"
        ? "email"
        : undefined);

  return (
    <div
      className={`${styles.floatingLabelInput} ${hasVisibleError ? styles.invalid : ""}`}>
      {isTextArea ? (
        <textarea
          id={inputId}
          {...register(name)}
          placeholder={placeholder || " "}
          rows={rows || 3}
          disabled={disabled}
          aria-invalid={hasVisibleError ? "true" : "false"}
          aria-describedby={hasVisibleError ? `${inputId}-error` : undefined}
          // textarea: no inputMode/autoComplete needed, but you can pass "off"
          autoComplete={defaultAutoComplete}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          {...register(name)}
          placeholder={placeholder || " "}
          disabled={disabled}
          aria-invalid={hasVisibleError ? "true" : "false"}
          aria-describedby={hasVisibleError ? `${inputId}-error` : undefined}
          autoComplete={defaultAutoComplete}
          inputMode={defaultInputMode}
        />
      )}

      <label htmlFor={inputId}>{label}</label>
      <p id={`${inputId}-error`} className={styles.errorText} role="alert">
        {error || ""}
      </p>
    </div>
  );
}
