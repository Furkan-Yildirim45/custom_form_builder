"use client"

import React, { useState } from "react";
import FormBuilder from "./components/form_builder/page";

const HomePage: React.FC = () => {
  const [previewFields, setPreviewFields] = useState<any[]>([]); // Form elemanlarını tutacak state

  // Form elemanını ön izleme kısmına ekleme fonksiyonu
  const addFieldToPreview = (field: any) => {
    setPreviewFields((prevFields) => [...prevFields, field]);
  };

  return (
    <div className="h-screen grid grid-cols-[1fr_2fr_1fr] gap-4 p-4 bg-gray-100">
      {/* Sol Menü */}
      <div className="bg-white shadow rounded p-4">
        <FormBuilder addFieldToPreview={addFieldToPreview} />
      </div>

      {/* Orta Kısım - Form Önizleme */}
      <div className="bg-white shadow rounded p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Form Önizlemesi</h1>
        <div className="w-full h-[500px] border-2 border-dashed border-gray-300 bg-gray-50">
          {/* Form elemanlarını ön izleme kısmında gösteriyoruz */}
          {previewFields.map((field, index) => (
            <div key={index} className="mb-4">
              {field.type === "text" && (
                <input
                  type="text"
                  placeholder={field.label || "Metin Alanı"}
                  className="border p-2 w-full mb-2"
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  placeholder={field.label || "Metin Kutusu"}
                  className="border p-2 w-full mb-2"
                  rows={3}
                />
              )}
              {field.type === "checkbox" && (
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>{field.label || "Onay Kutusu"}</span>
                </div>
              )}
              {field.type === "image" && (
                <div>
                  <input type="file" className="mb-2" />
                  <p>{field.label || "Resim Yükleyin"}</p>
                </div>
              )}
              {field.type === "date" && (
                <div>
                  <input type="date" className="mb-2 border p-2 w-full" />
                  <p>{field.label || "Tarih Seçin"}</p>
                </div>
              )}
              {field.type === "radio" && (
                <div>
                  {field.options?.map((option: string, i: number) => (
                    <div key={i} className="flex items-center">
                      <input
                        type="radio"
                        id={`${field.id}-option-${i}`}  // Benzersiz bir ID oluşturuyoruz
                        name={`radio-group-${field.id}`}  // Her form elemanına özgü bir name
                        value={option}
                        className="mr-2"
                      />
                      <label htmlFor={`${field.id}-option-${i}`}>{option}</label>
                    </div>
                  ))}
                </div>
              )}
              {field.type === "file" && (
                <div>
                  <input type="file" className="mb-2" />
                  <p>{field.label || "Dosya Yükleyin"}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Panel */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-bold mb-4">Düzenleme Seçenekleri</h2>
        <p>Buraya form düzenleme özellikleri eklenebilir.</p>
      </div>
    </div>
  );
};

export default HomePage;
