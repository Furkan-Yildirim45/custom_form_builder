type FieldType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "checkbox"
  | "radio"
  | "select"
  | "image"
  | "textarea"
  | "file"
  | "date"
  | "range";

interface Field {
  id: number;
  type: FieldType;
  label: string;
  value: string;
  options?: string[]; // 'checkbox', 'radio' veya 'select' tipi için seçenekler
  x: number;
  y: number;
  style?: {
    width?: number;
    height?: number;
    backgroundColor?: string;
    fontSize?: number;
    borderRadius?: number;
    border?: string; // Örnek: "1px solid #000"
    borderColor?: string;
    boxShadow?: string; // Örnek: "0px 4px 6px rgba(0,0,0,0.1)"
    opacity?: number;
    textAlign?: "left" | "center" | "right";
  };
}
