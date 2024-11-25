"use client"
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormBuilder from "@/app/components/form_builder/page";
import DraggableField from "@/app/components/draggable_field/page";

interface HomePageProps {
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const [previewFields, setPreviewFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<any>(null); // Seçilen alan state'i

  const addFieldToPreview = (field: any) => {
    setPreviewFields((prevFields) => [
      ...prevFields,
      { ...field, x: 0, y: 0 },
    ]);
  };

  const moveField = (id: number, x: number, y: number) => {
    setPreviewFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, x, y } : field
      )
    );
  };

  const updateField = (id: number, updatedData: Partial<any>) => {
    setPreviewFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedData } : field
      )
    );
    if (selectedField?.id === id) {
      setSelectedField({ ...selectedField, ...updatedData });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen grid grid-cols-[1fr_2fr_1fr] gap-4 p-4 bg-gray-100">
        {/* Form Builder */}
        <div className="bg-white shadow rounded p-4">
          <FormBuilder addFieldToPreview={addFieldToPreview} />
        </div>

        {/* Form Preview */}
        <div className="bg-white shadow rounded p-8 relative">
          <h1 className="text-2xl font-bold mb-4">Form Önizlemesi</h1>
          <div className="w-full h-[500px] border-2 border-dashed border-gray-300 bg-gray-50 relative">
            {previewFields.map((field) => (
              <DraggableField
                key={field.id}
                field={field}
                moveField={moveField}
                updateField={updateField}
                onSelect={() => setSelectedField(field)} // Alan seçimi
              />
            ))}
          </div>
        </div>

        {/* Edit Options */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-4">Düzenleme Seçenekleri</h2>
          {selectedField ? (
            <div>
              {/* Etiket Düzenleme */}
              <label className="block mb-2">Etiket:</label>
              <input
                type="text"
                value={selectedField.label}
                onChange={(e) =>
                  updateField(selectedField.id, { label: e.target.value })
                }
                className="border p-2 w-full mb-4"
              />

              {/* Stil Özellikleri */}
              <label className="block mb-2">Genişlik (px):</label>
              <input
                type="number"
                value={selectedField.style?.width || 200}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    style: { ...selectedField.style, width: Number(e.target.value) },
                  })
                }
                className="border p-2 w-full mb-4"
              />

              <label className="block mb-2">Yükseklik (px):</label>
              <input
                type="number"
                value={selectedField.style?.height || 50}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    style: { ...selectedField.style, height: Number(e.target.value) },
                  })
                }
                className="border p-2 w-full mb-4"
              />

              <label className="block mb-2">Arka Plan Rengi:</label>
              <input
                type="color"
                value={selectedField.style?.backgroundColor || "#ccc"}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    style: { ...selectedField.style, backgroundColor: e.target.value },
                  })
                }
                className="border p-2 w-full mb-4"
              />

              <button
                onClick={() => setSelectedField(null)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Seçimi Kaldır
              </button>
            </div>
          ) : (
            <p>Bir alan seçmek için üzerine tıklayın.</p>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default HomePage;
