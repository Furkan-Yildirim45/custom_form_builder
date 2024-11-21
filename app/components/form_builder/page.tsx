"use client";

import React, { useState } from "react";

type FieldType =
  | "text"
  | "textarea"
  | "checkbox"
  | "image"
  | "date"
  | "radio"
  | "file";

interface Field {
  id: number;
  type: FieldType;
  label: string;
  value: string;
  options?: string[]; // Radyo butonları için seçenekler
}

const FormBuilder: React.FC<{ addFieldToPreview: (field: Field) => void }> = ({
  addFieldToPreview,
}) => {
  const [fields, setFields] = useState<Field[]>([]);

  const addField = (type: FieldType) => {
    const newField = { id: Date.now(), type, label: "", value: "" };
    setFields([...fields, newField]);
    addFieldToPreview(newField); // Yeni eklenen alanı ön izleme kısmına gönder
  };

  const handleFieldChange = (id: number, key: keyof Field, value: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Form Elemanları</h2>
      <div className="flex flex-col space-y-2">
        <button className="btn-primary" onClick={() => addField("text")}>
          Metin Alanı Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("textarea")}>
          Metin Kutusu Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("checkbox")}>
          Onay Kutusu Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("image")}>
          Resim Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("date")}>
          Tarih Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("radio")}>
          Radyo Butonları Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("file")}>
          Dosya Yükleme Ekle
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
