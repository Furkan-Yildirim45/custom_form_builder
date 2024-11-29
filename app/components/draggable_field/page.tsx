import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { BiReset } from "react-icons/bi";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(field.label || "Metin");
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Taşıma işlemi için Drag'n'Drop
  const [, connectDrag] = useDrag({
    type: "field",
    item: { id: field.id, initialX: position.x, initialY: position.y },
    canDrag: () => isSelected, // Sadece seçilen alan taşınabilir
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Alanı üzerine bırakma işlemi
  const [, connectDrop] = useDrop({
    accept: "field",
    hover: (item: any, monitor) => {
      if (isDragging) return;
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const newX = item.initialX + delta.x;
        const newY = item.initialY + delta.y;
        setPosition({ x: newX, y: newY });
      }
    },
    drop: (item: any) => {
      moveField(item.id, position.x, position.y);
      updateField(item.id, { x: position.x, y: position.y });
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

  connectDrag(ref);
  connectDrop(ref);

  const renderField = (field: any) => {
    switch (field.type) {
      case "text":
      case "password":
      case "email":
      case "number":
      case "tel":
        return (
          <input
            type={field.type}
            placeholder={field.label}
            style={{
              width: dimensions.width,
              height: dimensions.height,
            }}
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={field.label}
            style={{
              width: dimensions.width,
              height: dimensions.height,
            }}
          />
        );
      case "checkbox":
        return <input type="checkbox" />;
      case "radio":
        return (
          <div>
            {field.options?.map((option: string, idx: number) => (
              <label key={idx}>
                <input type="radio" name={`radio-${field.id}`} value={option} />
                {option}
              </label>
            ))}
          </div>
        );
      case "select":
        return (
          <select
            style={{
              width: dimensions.width,
              height: dimensions.height,
            }}
          >
            {field.options?.map((option: string, idx: number) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "image":
        return <input type="file" accept="image/*" />;
      case "file":
        return <input type="file" />;
      case "date":
        return <input type="date" />;
      case "range":
        return <input type="range" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation(); // Bu tıklamanın dışarıya taşımayı engellemesini istemiyoruz
        onSelect(); // Seçim için sadece buradaki tıklama ile yapılacak
      }}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        border: isSelected ? "2px solid blue" : "1px solid grey",
        backgroundColor: field.style?.backgroundColor || "transparent",
        cursor: isSelected ? "move" : "default",
        width: dimensions.width,
        height: dimensions.height,
      }}
      onMouseMove={handleResize}
      onMouseUp={handleResizeEnd}
      onMouseLeave={handleResizeEnd}
    >
      {renderField(field)}

      <div
        style={{
          position: "absolute",
          bottom: -15,
          right: -15,
          width: 30,
          height: 30,
          backgroundColor: "red",
          borderRadius: "50%",
          border: "1px solid grey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "nwse-resize",
        }}
        onMouseDown={handleResizeStart}
      >
        <BiReset size={16} />
      </div>
    </div>
  );
};

export default DraggableField;
