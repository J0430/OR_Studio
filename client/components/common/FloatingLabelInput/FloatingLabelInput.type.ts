//FlotatingLabelInput.types.ts
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "textarea"; // 'textarea' will be handled specially

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  rows?: number; // Only used if type === 'textarea' for multi-line input
}
