import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggableFieldProps {
  field: any;
  moveField: (id: number, x: number, y: number) => void;
  updateField: (id: number, updatedData: Partial<any>) => void;
  onSelect: () => void; // Alan seçme fonksiyonu
  isSelected: boolean; // Seçili alan mı?
}

const DraggableField: React.FC<DraggableFieldProps> = ({
  field,
  moveField,
  updateField,
  onSelect,
  isSelected,
}) => {
  const [position, setPosition] = useState({ x: field.x || 0, y: field.y || 0 });
  const [dimensions, setDimensions] = useState({
    width: field.style?.width || 200,
    height: field.style?.height || 50,
  });
  const [isResizing, setIsResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false); // Düzenleme durumu
  const [editedText, setEditedText] = useState(field.label || "Metin"); // Düzenlenebilir metin
  const ref = useRef<HTMLDivElement>(null);

  const [, connectDrag] = useDrag({
    type: "field",
    item: { id: field.id, initialX: position.x, initialY: position.y },
  });

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
        moveField(item.id, position.x, position.y); // Pozisyon güncelle
        updateField(item.id, { x: position.x, y: position.y });
      }
    },
  });

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleResize = (e: React.MouseEvent) => {
    if (isResizing) {
      const deltaX = e.clientX - initialMousePosition.x;
      const deltaY = e.clientY - initialMousePosition.y;

      setDimensions((prev) => ({
        width: Math.max(100, prev.width + deltaX),
        height: Math.max(50, prev.height + deltaY),
      }));
      setInitialMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    updateField(field.id, { style: { ...dimensions } });
  };

  const handleTextClick = () => {
    setIsEditing(true); // Metin düzenleme moduna geçiş
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value); // Metin değişikliği
  };

  const handleBlur = () => {
    setIsEditing(false); // Düzenlemeyi bitir
    updateField(field.id, { label: editedText }); // Yeni metni kaydet
  };

  connectDrag(ref);
  connectDrop(ref);

  return (
    <div
      ref={ref}
      onClick={onSelect}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: dimensions.width,
        height: dimensions.height,
        border: isSelected ? "2px solid blue" : "none",
        backgroundColor: field.style?.backgroundColor || "transparent",
      }}
      className="relative"
    >
      <div className="absolute inset-0 flex items-center justify-center cursor-move">
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={handleTextChange}
            onBlur={handleBlur}
            autoFocus
            className="w-full h-full bg-transparent border-none"
          />
        ) : (
          <span onClick={handleTextClick}>{editedText}</span>
        )}
      </div>

      {isSelected && (
        <>
          {/* Boyutlandırma Tutamağı */}
          <div
            onMouseDown={handleResizeStart}
            onMouseMove={handleResize}
            onMouseUp={handleResizeEnd}
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
          />

          {/* Taşıma İkonu */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-300 cursor-move"></div>
        </>
      )}
    </div>
  );
};

export default DraggableField;
