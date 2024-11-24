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

  // Boyutlandırma için gerekli fonksiyonlar
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY }); // Mouse pozisyonunu kaydet
  };

  const handleResize = (e: React.MouseEvent) => {
    if (isResizing && ref.current) {
      const deltaX = e.clientX - initialMousePosition.x; // Mouse hareketi ile genişlik farkı
      const deltaY = e.clientY - initialMousePosition.y; // Mouse hareketi ile yükseklik farkı

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
        left: position.x, // Güncellenmiş X pozisyonu
        top: position.y,  // Güncellenmiş Y pozisyonu
        width: dimensions.width,  // Güncellenmiş genişlik
        height: dimensions.height, // Güncellenmiş yükseklik
        cursor: isResizing ? "se-resize" : "move",  // Boyutlandırma sırasında cursor değişir
        backgroundColor: "#ccc",
        border: "2px solid #000",
      }}
      className="p-4 bg-blue-100 border rounded"
    >
      {field.label || "Sürüklenebilir Alan"} {/* Alanın etiketini göster */}
      
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
