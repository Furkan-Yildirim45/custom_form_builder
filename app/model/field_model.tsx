type FieldType = "text" | "password" | "email" | "number" | "tel" | "checkbox" | "radio" | "select" | "image" | "textarea" | "file" | "date" | "range";

interface Field {
  id: number;
  type: FieldType;
  label: string;
  value: string;
  options?: string[]; // 'checkbox' veya 'radio' tipi için seçenekler
  x: number;
  y: number;
  style?: {
    width?: number;
    height?: number;
    backgroundColor?: string;
    fontSize?: number;
  };
}
