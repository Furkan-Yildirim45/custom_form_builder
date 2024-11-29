"use client"
import React, { useState, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormBuilder from "@/app/components/form_builder/page";
import FormPreview from "@/app/components/home/form_preview";
import EditOptions from "@/app/components/home/form_edit";
import Header from "@/app/components/home/form_header";

const HomePage: React.FC = () => {
  const [previewFields, setPreviewFields] = useState<any[]>([]);
  const [selectedField, setSelectedField] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // PDF URL'ini tutacak state

  const updateField = (id: number, updatedData: Partial<any>) => {
    setSelectedField((prevState: any) => {
      if (prevState?.id === id) {
        return { ...prevState, ...updatedData };
      }
      return prevState;
    });

    setPreviewFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedData } : field
      )
    );
  };

  const clearSelection = () => setSelectedField(null);

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

  const removeField = (id: number) => {
    setPreviewFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" && selectedField) {
        removeField(selectedField.id);
        setSelectedField(null);
      }

      if (event.key === "Escape" && selectedField) {
        setSelectedField(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedField]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-100">
        {/* setPdfUrl fonksiyonunu Header bileşenine geçiriyoruz */}
        <Header username="John Doe" setPdfUrl={setPdfUrl} />

        <div className="h-full grid grid-cols-[1fr_2fr_1fr] gap-4 p-4">
          <div className="bg-white shadow rounded p-4">
            <FormBuilder
              addFieldToPreview={addFieldToPreview}
              removeField={removeField}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
            />
          </div>
          <div className="bg-white shadow rounded p-8 relative">
            <FormPreview
              previewFields={previewFields}
              moveField={moveField}
              updateField={updateField}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              pdfUrl={pdfUrl} // PDF URL'ini FormPreview bileşenine gönder
            />
          </div>
          <div className="bg-white shadow rounded p-4">
            <EditOptions
              selectedField={selectedField}
              updateField={updateField}
              clearSelection={clearSelection}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default HomePage;
