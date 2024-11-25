type FieldType = 'text' | 'textarea' | 'checkbox' | 'image' | 'date' | 'radio' | 'file';

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
