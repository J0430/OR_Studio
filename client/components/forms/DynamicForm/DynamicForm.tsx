import React, { useState } from "react";
import type { Path } from "react-hook-form";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldDefinition } from "@common/FloatingLabelInput/FloatingLabelInput.type";
import { FloatingLabelInput } from "@common/FloatingLabelInput/FloatingLabelInput";
import styles from "./DynamicForm.module.scss";
import { BaseFormData } from "./DynamicForm.types";

interface DynamicFormProps<FormData extends BaseFormData> {
  schema: yup.ObjectSchema<FormData>;
  fields: FieldDefinition[];
  onSubmit: (data: FormData) => Promise<void> | void;
  title?: string;
  logoSrc?: string;
  successMessage?: string;
}

export const DynamicForm = <FormData extends Record<string, any>>({
  schema,
  fields,
  onSubmit,
  title,
  logoSrc,
  successMessage,
}: DynamicFormProps<FormData>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormData>({
    // ✅ TypeScript-compatible fix
    resolver: yupResolver(schema) as any,
    mode: "onSubmit",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmit: SubmitHandler<FormData> = async (formData) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      if (err?.fieldErrors) {
        for (const [fieldName, message] of Object.entries(err.fieldErrors)) {
          setError(fieldName as Path<FormData>, {
            type: "server",
            message: String(message),
          });
        }
      }
      setServerError(
        err?.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {logoSrc && <img src={logoSrc} alt="Form logo" className={styles.logo} />}
      {title && <h2 className={styles.title}>{title}</h2>}

      {serverError && (
        <p className={styles.errorText} role="alert">
          {serverError}
        </p>
      )}

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
