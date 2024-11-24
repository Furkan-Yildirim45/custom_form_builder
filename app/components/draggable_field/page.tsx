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
  // Sürükleme için pozisyon ve boyutları kontrol et
  const [position, setPosition] = useState({ x: field.x || 0, y: field.y || 0 });
  const [dimensions, setDimensions] = useState({
    width: 200, // Başlangıç genişliği
    height: 50, // Başlangıç yüksekliği
  });
  const [isResizing, setIsResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  // Sürükleme için useDrag hook'u
  const [, connectDrag] = useDrag({
    type: "field",
    item: { id: field.id, initialX: position.x, initialY: position.y },
  });

  // Bırakma için useDrop hook'u
  const [, connectDrop] = useDrop({
    accept: "field",
    hover: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const newX = item.initialX + delta.x;
        const newY = item.initialY + delta.y;
        setPosition({ x: newX, y: newY });
      }
    },
    drop: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        moveField(item.id, clientOffset.x, clientOffset.y);
      }
    },
  });

  // Boyutlandırma için gerekli fonksiyonlar
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleResize = (e: React.MouseEvent) => {
    if (isResizing && ref.current) {
      const deltaX = e.clientX - initialMousePosition.x;
      const deltaY = e.clientY - initialMousePosition.y;

      // Yeni boyutları hesapla
      const newWidth = Math.max(100, dimensions.width + deltaX); // Minimum 100px genişlik
      const newHeight = Math.max(50, dimensions.height + deltaY); // Minimum 50px yükseklik

      setDimensions({ width: newWidth, height: newHeight });

      // Mouse pozisyonunu güncelle
      setInitialMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  // Drag ve Drop bağlantılarını birleştir
  connectDrag(ref);
  connectDrop(ref);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: dimensions.width,
        height: dimensions.height,
        cursor: isResizing ? "se-resize" : "move",
        backgroundColor: "#ccc",
        border: "2px solid #000",
      }}
      className="p-4 bg-blue-100 border rounded"
    >
      
      {/* Input türleri */}
      {field.type === "text" && <input type="text" />}
      {field.type === "textarea" && <textarea />}
      {field.type === "checkbox" && <input type="checkbox" />}
      {field.type === "radio" && field.options?.map((option: string, index: number) => (
        <div key={index}>
          <input type="radio" /> {option}
        </div>
      ))}

      {/* Boyutlandırma tutamağı */}
      <div
        onMouseDown={handleResizeStart}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "10px",
          height: "10px",
          backgroundColor: "#000",
          cursor: "se-resize", // Sağ alt köşe boyutlandırma için
        }}
      />

      {/* Boyutlandırma işlemi aktifse, onMouseMove ve onMouseUp event'leri aktif olacak */}
      {isResizing && (
        <div
          onMouseMove={handleResize}
          onMouseUp={handleResizeEnd}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  );
};

export default DraggableField;
