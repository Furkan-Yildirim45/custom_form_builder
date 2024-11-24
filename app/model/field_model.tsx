type FieldType = 'text' | 'textarea' | 'checkbox' | 'image' | 'date' | 'radio' | 'file';

interface Field {
  id: number;
  type: FieldType;
  label: string;
  value: string;
  options?: string[];
  x: number;
  y: number;
}
