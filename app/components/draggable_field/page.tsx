import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { BiReset } from "react-icons/bi"; // react-icons örneği

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
  const [isDragging, setIsDragging] = useState(false); // Taşıma durumu
  const ref = useRef<HTMLDivElement>(null);

  const [, connectDrag] = useDrag({
    type: "field",
    item: { id: field.id, initialX: position.x, initialY: position.y },
    canDrag: () => isSelected, // Yalnızca seçili alan taşınabilir
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, connectDrop] = useDrop({
    accept: "field",
    hover: (item: any, monitor) => {
      if (isDragging) return; // Taşıma yapılırken hover ile işlem yapılmasın
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
        width: Math.max(100, prev.width + deltaX), // Min. genişlik 100px
        height: Math.max(50, prev.height + deltaY), // Min. yükseklik 50px
      }));

      // Fare pozisyonunu güncelle
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
        return <input type="text" placeholder={field.label} />;
      case "password":
        return <input type="password" placeholder={field.label} />;
      case "email":
        return <input type="email" placeholder={field.label} />;
      case "number":
        return <input type="number" placeholder={field.label} />;
      case "tel":
        return <input type="tel" placeholder={field.label} />;
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
          <select>
            {field.options?.map((option: string, idx: number) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "image":
        return <input type="file" accept="image/*" />;
      case "textarea":
        return <textarea placeholder={field.label} />;
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
      onClick={onSelect}
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
      onMouseMove={handleResize} // Fare hareketiyle boyutlandırma
      onMouseUp={handleResizeEnd} // Fare bırakıldığında boyutlandırmayı bitir
      onMouseLeave={handleResizeEnd} // Fare alan dışına çıkarsa da boyutlandırmayı bitir
    >
      {renderField(field)}

      {/* Boyutlandırma İkonu */}
      <div
        style={{
          position: "absolute",
          bottom: -15,
          right: -15,
          width: 30, // Daha büyük bir alan
          height: 30, // Daha büyük bir alan
          backgroundColor: "red", // Daha belirgin bir renk
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

