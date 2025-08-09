// components/forms/FloatingLabelInput.type.ts
// components/forms/FloatingLabelInput.type.ts
export type FieldType = "text" | "email" | "tel" | "textarea";

export interface FieldDefinition {
  label: string;
  type?: FieldType;
  placeholder?: string;
  rows?: number;
  autoComplete?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
}
