// components/forms/FloatingLabelInput.type.ts
export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "password"
  | "textarea"
  | "url";

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  rows?: number;

  clicked: boolean;
}
