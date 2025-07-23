//DynamicForm.tsx

import React, { useState } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldDefinition } from "@common/FloatingLabelInput/FloatingLabelInput.type";
import { FloatingLabelInput } from "@common/FloatingLabelInput/FloatingLabelInput";
import styles from "./DynamicForm.module.scss";

interface DynamicFormProps<FormData extends Record<string, any>> {
  schema: yup.ObjectSchema<FormData>; // Yup schema defining form structure and validation
  fields: FieldDefinition[]; // Fields configuration for rendering inputs
  onSubmit: (data: FormData) => Promise<void> | void; // callback to handle form data submission
  title?: string; // Optional form title to display at top
  logoSrc?: string; // Optional logo image URL to display at top of form
  successMessage?: string; // Optional custom success message
}

export const DynamicForm = <FormData extends Record<string, any>>({
  schema,
  fields,
  onSubmit,
  title,
  logoSrc,
  successMessage,
}: DynamicFormProps<FormData>) => {
  // Initialize the form with react-hook-form, connecting the Yup schema.
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit", // validate on submit; use 'onChange' or 'onBlur' for live validation
  });

  // Local UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form submit handler (wraps the user-provided onSubmit to handle loading and errors)
  const handleFormSubmit: SubmitHandler<FormData> = async (formData) => {
    setServerError(null); // clear any previous server error
    setIsSubmitting(true);
    try {
      await onSubmit(formData); // attempt to submit form data
      setIsSuccess(true); // if successful, mark success state
      reset(); // optionally reset form fields
    } catch (err: any) {
      // If server returns validation errors for specific fields, use setError to show them
      if (err && err.fieldErrors) {
        // err.fieldErrors is assumed to be an object like { fieldName: "Error message", ... }
        for (const [fieldName, message] of Object.entries(err.fieldErrors)) {
          setError(fieldName as keyof FormData, {
            type: "server",
            message: String(message),
          });
        }
      }
      // Handle a general server error (not field-specific)
      if (err && err.message) {
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // If the form was successfully submitted, show a success message (and optionally hide the form)
  if (isSuccess) {
    return (
      <div className={styles.successMessage} aria-live="polite">
        {successMessage || "Success! Your submission has been received."}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles.dynamicForm}>
      {/* Optional logo and title */}
      {logoSrc && <img src={logoSrc} alt="Form logo" className={styles.logo} />}
      {title && <h2 className={styles.title}>{title}</h2>}

      {/* Global (server) error message, if any */}
      {serverError && (
        <p className={styles.errorText} role="alert">
          {serverError}
        </p>
      )}

      {/* Render each field using FloatingLabelInput */}
      {fields.map((field) => (
        <FloatingLabelInput
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          rows={field.rows}
          register={register}
          disabled={isSubmitting}
          error={errors[field.name]?.message as string}
        />
      ))}

      {/* Submit button */}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
        aria-disabled={isSubmitting ? "true" : "false"}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
