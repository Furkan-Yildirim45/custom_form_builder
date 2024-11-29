"use client";
import React, { useState, useEffect } from "react";
import DraggableField from "../draggable_field/page";

interface FormPreviewProps {
  previewFields: any[];
  moveField: (id: number, x: number, y: number) => void;
  updateField: (id: number, updatedData: Partial<any>) => void;
  selectedField: any;
  setSelectedField: (field: any) => void;
  pdfUrl: string | null; // PDF URL'ini alıyoruz
}

const FormPreview: React.FC<FormPreviewProps> = ({
  previewFields,
  moveField,
  updateField,
  selectedField,
  setSelectedField,
  pdfUrl,
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [previewHeight, setPreviewHeight] = useState<number>(0);

  // A4 en-boy oranı: 210mm x 297mm
  const A4AspectRatio = 210 / 297;

  useEffect(() => {
    const updateWidth = () => {
      const width = window.innerWidth;
      setContainerWidth(width);

      // A4 en-boy oranına göre yüksekliği ayarlıyoruz
      const calculatedHeight = width * A4AspectRatio;
      setPreviewHeight(calculatedHeight);
    };

    updateWidth(); // İlk hesaplama

    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Form Önizlemesi</h1>
      <div
        className="w-full border-2 border-dashed border-gray-300 bg-gray-50 relative"
        style={{ height: `${previewHeight}px` }}
      >
        {/* Form alanlarını burada ekliyoruz */}
        {previewFields.map((field) => (
          <DraggableField
            key={field.id}
            field={field}
            moveField={moveField}
            updateField={updateField}
            onSelect={() => setSelectedField(field)}
            isSelected={selectedField?.id === field.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FormPreview;
