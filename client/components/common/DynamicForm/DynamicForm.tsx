// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useForm, Path, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Image from "next/image";
// import { AnyObjectSchema, InferType } from "yup";

// import styles from "./DynamicForm.module.scss";
// import { FloatingLabelInput } from "../FloatingLabelInput/FloatingLabelInput";
// import { FieldType } from "../FloatingLabelInput/FloatingLabelInput.type";

// type DynamicFormProps<TSchema extends AnyObjectSchema> = {
//   schema: TSchema;
//   title?: string;
//   logo?: string;
// };

// export default function DynamicForm<TSchema extends AnyObjectSchema>({
//   schema,
//   title,
//   logo,
// }: DynamicFormProps<TSchema>) {
//   type Values = InferType<TSchema>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, touchedFields, isSubmitting },
//     reset,
//     trigger,
//   } = useForm<Values>({
//     resolver: yupResolver(schema),
//     mode: "onChange",
//   });

//   const [serverError, setServerError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const onSubmit: SubmitHandler<Values> = async (data) => {
//     setServerError("");
//     setSuccess(false);
//     try {
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) throw new Error("Failed to send message");

//       setSuccess(true);
//       reset();
//     } catch (err) {
//       console.error("Submission error:", err);
//       setServerError("Something went wrong. Please try again.");
//     }
//   };

//   const renderFloatingInput = (
//     name: Path<Values>,
//     label: string,
//     type: FieldType = "text",
//     placeholder?: string
//   ) => (
//     <FloatingLabelInput<Values>
//       name={name}
//       label={label}
//       type={type}
//       placeholder={placeholder}
//       register={register}
//       error={String(errors[name]?.message || "")}
//       clicked
//       disabled={isSubmitting}
//     />
//   );
// const [clicked, useClick] =useState(false)
//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
//       <div className={styles.formRow}>
//         <div className={styles.formGroup}>
//           {renderFloatingInput("firstName" as Path<Values>, "First Name")}
//         </div>
//         <div className={styles.formGroup}>
//           {renderFloatingInput("lastName" as Path<Values>, "Last Name")}
//         </div>
//       </div>

//       {Object.keys(schema.fields)
//         .filter((field) => !["firstName", "lastName"].includes(field))
//         .map((field) => {
//           const isMessage = field.toLowerCase() === "message";
//           return (
//             <div className={styles.formGroup} key={field}>
//               {renderFloatingInput(
//                 field as Path<Values>,
//                 field.charAt(0).toUpperCase() + field.slice(1),
//                 isMessage ? "textarea" : "text"
//               )}
//             </div>
//           );
//         })}

//       <motion.button
//         type="submit"
//         className={styles.submitButton}
//         whileTap={{ scale: 0.95 }}>
//         <span>{isSubmitting ? "Sending..." : "Send"}</span>
//       </motion.button>

//       {serverError && <p className={styles.errorMessage}>{serverError}</p>}
//       {success && (
//         <p className={styles.successMessage}>Message sent successfully!</p>
//       )}
//     </form>
//   );
// }
// import { useState, ReactNode } from "react";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// import { dynamicImportComponents } from "utils/dynamicImportComponents";
// import { AnyObjectSchema, InferType } from "yup";
// import { FloatingLabelInput } from "../FloatingLabelInput/FloatingLabelInput";

// import Image from "next/image";
// import styles from "./DynamicForm.module.scss";

// type DynamicFormProps<TSchema extends AnyObjectSchema> = {
//   schema: TSchema;
//   title?: string;
//   logo?: string;
// };

// function formatLabel(name: string) {
//   return name.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
// }

// const { FieldType, Spinner } = dynamicImportComponents("common", [
//   "FieldType",
//   "Spinner",
// ]);

// function getSchemaFieldKeys(schema: AnyObjectSchema): string[] {
//   const s = schema as unknown as { fields?: Record<string, unknown> };
//   return s?.fields ? Object.keys(s.fields) : [];
// }

// function inputTypeFor(
//   field: string
// ): React.InputHTMLAttributes<HTMLInputElement>["type"] {
//   const f = field.toLowerCase();
//   if (f.includes("email")) return "email";
//   if (f.includes("phone") || f.includes("tel")) return "tel";
//   if (f.includes("name")) return "text";
//   return "text";
// }
// const { SendButton } = dynamicImportComponents("common", ["SendButton"]);

// export default function DynamicForm<TSchema extends AnyObjectSchema>({
//   schema,
//   title,
//   logo,
// }: DynamicFormProps<TSchema>) {
//   type FormValues = InferType<TSchema>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, touchedFields, isSubmitting },
//     reset,
//     trigger,
//   } = useForm<FormValues>({ resolver: yupResolver(schema), mode: "onChange" });

//   const [serverError, setServerError] = useState<string>("");
//   const [success, setSuccess] = useState<boolean>(false);
//   const onSubmit = async (data) => {
//     setServerError("");
//     setSuccess(false);
//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         let msg = "Failed to send message";
//         try {
//           const err = await res.json();
//           msg = err?.error || err?.message || msg;
//         } catch {}
//         // throw new (msg);
//       }

//       setSuccess(true);
//       reset();
//     } catch (err) {
//       console.error("Submission error:", err);
//       setServerError(err?.message || "Something went wrong. Please try again.");
//     }
//   };

//   const allFields = getSchemaFieldKeys(schema);
//   const firstLast = ["firstName", "lastName"].filter((f) =>
//     allFields.includes(f)
//   );
//   const rest = allFields.filter((f) => !firstLast.includes(f));

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className={styles.contactForm}
//       noValidate>
//       {/* First + Last Name Row (only if present in schema) */}
//       {firstLast.length > 0 && (
//         <div className={styles.formRow}>
//           {firstLast.map((field) => {
//             const id = `fld_${field}`;
//             const hasError = !!(errors as any)[field];
//             return (
//               <div className={styles.formGroup} key={field}>
//                 <input
//                   id={id}
//                   type={inputTypeFor(field)}
//                   {...register(field as any)}
//                   onBlur={() => trigger(field as any)}
//                   className={`${styles.inputField} ${touchedFields[field as keyof FormValues] && !(errors as any)[field] ? styles.valid : ""} ${hasError ? styles.error : ""}`}
//                   placeholder={formatLabel(field)}
//                   aria-invalid={hasError || undefined}
//                   aria-describedby={hasError ? `${id}-error` : undefined}
//                   autoComplete="on"
//                 />
//                 {hasError && (
//                   <p id={`${id}-error`} className={styles.fieldError}>
//                     {(errors as any)[field]?.message as ReactNode}
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Other Fields */}
//       {rest.map((field) => {
//         const id = `fld_${field}`;
//         const isMessage = field.toLowerCase() === "message";
//         const hasError = !!(errors as any)[field];

//         return (
//           <div className={styles.formGroup} key={field}>
//             {isMessage ? (
//               <textarea
//                 id={id}
//                 {...register(field as any)}
//                 onBlur={() => trigger(field as any)}
//                 className={`${styles.inputField} ${touchedFields[field as keyof FormValues] && !(errors as any)[field] ? styles.valid : ""} ${hasError ? styles.error : ""}`}
//                 placeholder="Message"
//                 rows={4}
//                 aria-invalid={hasError || undefined}
//                 aria-describedby={hasError ? `${id}-error` : undefined}
//               />
//             ) : (
//               <input
//                 id={id}
//                 type={inputTypeFor(field)}
//                 {...register(field as any)}
//                 onBlur={() => trigger(field as any)}
//                 className={`${styles.inputField} ${touchedFields[field as keyof FormValues] && !(errors as any)[field] ? styles.valid : ""} ${hasError ? styles.error : ""}`}
//                 placeholder={formatLabel(field)}
//                 aria-invalid={hasError || undefined}
//                 aria-describedby={hasError ? `${id}-error` : undefined}
//                 autoComplete="on"
//               />
//             )}

//             {hasError && (
//               <p id={`${id}-error`} className={styles.fieldError}>
//                 {(errors as any)[field]?.message as ReactNode}
//               </p>
//             )}
//           </div>
//         );
//       })}

//       {/* Submit */}

//       <motion.button disabled={isSubmitting} className={styles.submitButton}>
//         {isSubmitting ? (
//           <span
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "0.5rem",
//             }}>
//             <Spinner sizeRem={1.1} thicknessPx={2} label="Sending…" />
//             <span>Sending…</span>
//           </span>
//         ) : (
//           "Send"
//         )}
//       </motion.button>
//       {/* <motion.button
//         type="submit"
//         className={styles.submitButton}
//         whileTap={{ scale: 0.95 }}
//         disabled={isSubmitting}
//         aria-busy={isSubmitting || undefined}>
//         <span>{isSubmitting ? "Sending..." : "Send"}</span> */}
//       {/* </motion.button> */}
//       {/* <SendButton
//         isSubmitting={isSubmitting}
//         disabled={isSubmitting}
//         submit
//         direction="up"
//         aria-busy={isSubmitting || undefined}
//       /> */}

//       {/* Server Errors & Success */}
//       {serverError && <p className={styles.errorMessage}>{serverError}</p>}
//       {success && (
//         <p className={styles.successMessage}>Message sent successfully!</p>
//       )}
//     </form>
//   );
// }
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Path, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AnyObjectSchema, InferType } from "yup";
import styles from "./DynamicForm.module.scss";
import { FloatingLabelInput } from "../FloatingLabelInput/FloatingLabelInput";
import { FieldType } from "../FloatingLabelInput/FloatingLabelInput.type";

import { notifySuccess, notifyError } from "components/common/Toast";

import Spinner from "components/common/Spinner/Spinner";

type DynamicFormProps<TSchema extends AnyObjectSchema> = {
  schema: TSchema;
  title?: string;
  logo?: string;
};

export default function DynamicForm<TSchema extends AnyObjectSchema>({
  schema,
  title,
  logo,
}: DynamicFormProps<TSchema>) {
  type Values = InferType<TSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
    reset,
  } = useForm<Values>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [serverError, setServerError] = useState("");

  const showErrors = submitCount > 0;

  const onSubmit: SubmitHandler<Values> = async (data) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          json?.error || json?.message || "Failed to send message"
        );
      }

      notifySuccess("Message sent successfully!");
      reset();
    } catch (err: any) {
      const msg = err?.message || "Something went wrong. Please try again.";
      setServerError(msg); // (optional: for logs/SSR a11y)
      notifyError(msg); // 🔔 elegant toast using your CSS vars
    }
  };

  const renderFloatingInput = (
    name: Path<Values>,
    label: string,
    type: FieldType = "text",
    placeholder?: string
  ) => (
    <FloatingLabelInput<Values>
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      register={register}
      error={showErrors ? String(errors[name]?.message || "") : ""}
      disabled={isSubmitting}
    />
  );

  // Helper to get schema field keys safely
  const fields = (() => {
    const s = schema as unknown as { fields?: Record<string, unknown> };
    return s?.fields ? Object.keys(s.fields) : [];
  })();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.contactForm}
      aria-busy={isSubmitting}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          {renderFloatingInput("firstName" as Path<Values>, "First Name")}
        </div>
        <div className={styles.formGroup}>
          {renderFloatingInput("lastName" as Path<Values>, "Last Name")}
        </div>
      </div>

      {fields
        .filter((f) => !["firstName", "lastName"].includes(f))
        .map((field) => {
          const isMessage = field.toLowerCase() === "message";
          return (
            <div className={styles.formGroup} key={field}>
              {renderFloatingInput(
                field as Path<Values>,
                field.charAt(0).toUpperCase() + field.slice(1),
                isMessage ? "textarea" : "text"
              )}
            </div>
          );
        })}

      <motion.button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
        whileTap={{ scale: 0.95 }}>
        {isSubmitting ? (
          <>
            <Spinner />
            <span style={{ marginLeft: 8 }}>Sending...</span>
          </>
        ) : (
          <span>Send</span>
        )}
      </motion.button>

      {/* Optional: hidden live region for screen readers */}
      <span style={{ position: "absolute", left: -9999 }} aria-live="polite">
        {isSubmitting ? "Sending" : serverError ? `Error: ${serverError}` : ""}
      </span>
    </form>
  );
}
