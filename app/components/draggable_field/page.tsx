import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggableFieldProps {
  field: any;
  moveField: (id: number, x: number, y: number) => void;
  updateField: (id: number, updatedData: Partial<any>) => void;
}

const DraggableField: React.FC<DraggableFieldProps> = ({
  field,
  moveField,
  updateField,
}) => {
  const [position, setPosition] = useState({ x: field.x || 0, y: field.y || 0 });
  const ref = useRef<HTMLDivElement>(null);

  // Sürükleme için useDrag hook'u
  const [, connectDrag] = useDrag({
    type: "field",
    item: { id: field.id, initialX: position.x, initialY: position.y }, // İlk pozisyonu da ilet
  });

  // Bırakma için useDrop hook'u
  const [, connectDrop] = useDrop({
    accept: "field", // Bu öğeyi kabul ederiz
    hover: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const newX = item.initialX + delta.x; // Sürükleme sırasında yeni X pozisyonu
        const newY = item.initialY + delta.y; // Sürükleme sırasında yeni Y pozisyonu
        setPosition({ x: newX, y: newY }); // Konumu güncelle
      }
    },
    drop: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        // Mouse bıraktığında final pozisyonu kaydet
        moveField(item.id, clientOffset.x, clientOffset.y);
      }
    },
  });

  // Drag ve Drop bağlantılarını birleştir
  connectDrag(ref);
  connectDrop(ref);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: position.x, // Güncellenmiş X pozisyonu
        top: position.y,  // Güncellenmiş Y pozisyonu
        cursor: "move",   // Sürükleme sırasında mouse pointer'ı
      }}
      className="p-4 bg-blue-100 border rounded"
    >
      {field.label || "Sürüklenebilir Alan"} {/* Alanın etiketini göster */}
    </div>
  );
};

export default DraggableField;
