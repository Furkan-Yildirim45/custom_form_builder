"use client";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormBuilder from "@/app/components/form_builder/page";
import FormPreview from "@/app/components/home/form_preview";
import EditOptions from "@/app/components/home/form_edit";

interface HomePageProps {
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const [previewFields, setPreviewFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<any>(null);

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
    console.log("Güncellenen alan:", id, updatedData); // Takip için
    setPreviewFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedData } : field
      )
    );
    if (selectedField?.id === id) {
      setSelectedField({ ...selectedField, ...updatedData });
    }
  };

  const removeField = (id: number) => {
    setPreviewFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  // `Del` tuşu işlevi
  const handleDeleteKey = (event: KeyboardEvent) => {
    if (event.key === "Delete" && selectedField) {
      removeField(selectedField.id);
      setSelectedField(null); // Seçilen öğeyi sıfırlama
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleDeleteKey);
    return () => {
      window.removeEventListener("keydown", handleDeleteKey);
    };
  }, [selectedField]);


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen grid grid-cols-[1fr_2fr_1fr] gap-4 p-4 bg-gray-100">
        <div className="bg-white shadow rounded p-4">
          <FormBuilder
            addFieldToPreview={addFieldToPreview}
            removeField={removeField}  // Pass removeField method
            selectedField={selectedField} // Pass selectedField to FormBuilder
            setSelectedField={setSelectedField} // Pass setter for selectedField
          />
        </div>
        <div className="bg-white shadow rounded p-8 relative">
          <FormPreview
            previewFields={previewFields}
            moveField={moveField}
            updateField={updateField}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
          />
        </div>
        <div className="bg-white shadow rounded p-4">
          <EditOptions
            selectedField={selectedField}
            updateField={updateField}
            clearSelection={() => setSelectedField(null)}
          />
        </div>
      </div>
    </DndProvider>
  );
};


export default HomePage