import React, { useState, useEffect } from "react";

interface EditOptionsProps {
  selectedField: any;
  updateField: (id: number, updatedData: Partial<any>) => void;
  clearSelection: () => void;
}

const EditOptions: React.FC<EditOptionsProps> = ({
  selectedField,
  updateField,
  clearSelection,
}) => {
  const [tempField, setTempField] = useState<any>(selectedField);

  // selectedField değiştiğinde tempField'ı da güncelle
  React.useEffect(() => {
    setTempField(selectedField);
  }, [selectedField]);

  // Field değişikliklerini handle et
  const handleFieldChange = (updatedData: Partial<any>) => {
    if (selectedField) {
      updateField(selectedField.id, updatedData); // Güncellenen alanı önizleme ekranına yansıt
    }
  };

  // Enter tuşu ile formu güncelle
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleFieldChange({ ...tempField }); // Değişiklikleri kaydet
    }
  };

    // Değişiklikleri uygula
    const applyChanges = () => {
      if (tempField) {
        updateField(tempField.id, tempField);
      }
    };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tempField]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Düzenleme Seçenekleri</h2>
      {tempField ? (
        <div>
          {/* Etiket düzenleme */}
          <label className="block mb-2">Etiket:</label>
          <input
            type="text"
            value={tempField.label || ""}
            onChange={(e) =>
              handleFieldChange({ ...tempField, label: e.target.value })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Genişlik düzenleme */}
          <label className="block mb-2">Genişlik (px):</label>
          <input
            type="number"
            value={tempField.style?.width || 200}
            onChange={(e) =>
              handleFieldChange({
                ...tempField,
                style: { ...tempField.style, width: Number(e.target.value) },
              })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Yükseklik düzenleme */}
          <label className="block mb-2">Yükseklik (px):</label>
          <input
            type="number"
            value={tempField.style?.height || 50}
            onChange={(e) =>
              handleFieldChange({
                ...tempField,
                style: { ...tempField.style, height: Number(e.target.value) },
              })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Arka plan rengi düzenleme */}
          <label className="block mb-2">Arka Plan Rengi:</label>
          <input
            type="color"
            value={tempField.style?.backgroundColor || "#ccc"}
            onChange={(e) =>
              handleFieldChange({
                ...tempField,
                style: { ...tempField.style, backgroundColor: e.target.value },
              })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Kenar yuvarlatma düzenleme */}
          <label className="block mb-2">Kenar Yuvarlatma (px):</label>
          <input
            type="number"
            value={tempField.style?.borderRadius || 0}
            onChange={(e) =>
              handleFieldChange({
                ...tempField,
                style: {
                  ...tempField.style,
                  borderRadius: Number(e.target.value),
                },
              })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Opacity düzenleme */}
          <label className="block mb-2">Opacity:</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={tempField.style?.opacity || 1}
            onChange={(e) =>
              handleFieldChange({
                ...tempField,
                style: {
                  ...tempField.style,
                  opacity: parseFloat(e.target.value),
                },
              })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Border düzenleme */}
          <label className="block mb-2">Kenar Çizgisi:</label>
          <input
            type="text"
            placeholder="Örnek: 1px solid #000"
            value={tempField.style?.border || ""}
            onChange={(e) =>
              handleFieldChange({
                ...tempField,
                style: { ...tempField.style, border: e.target.value },
              })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Border Renk düzenleme */}
          <label className="block mb-2">Kenar Rengi:</label>
          <input
            type="color"
            value={tempField.style?.borderColor || "#000000"}
            onChange={(e) =>
              handleFieldChange({
                ...tempField,
                style: { ...tempField.style, borderColor: e.target.value },
              })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Gölge düzenleme */}
          <label className="block mb-2">Gölge (Box Shadow):</label>
          <input
            type="text"
            placeholder="Örnek: 0px 4px 6px rgba(0,0,0,0.1)"
            value={tempField.style?.boxShadow || ""}
            onChange={(e) =>
              handleFieldChange({
                ...tempField,
                style: { ...tempField.style, boxShadow: e.target.value },
              })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Metin Hizalama (Text Align) */}
          <label className="block mb-2">Metin Hizalama:</label>
          <select
            value={tempField.style?.textAlign || "left"}
            onChange={(e) =>
              handleFieldChange({
                ...tempField,
                style: { ...tempField.style, textAlign: e.target.value },
              })
            }
            className="border p-2 w-full mb-4"
          >
            <option value="left">Sol</option>
            <option value="center">Ortala</option>
            <option value="right">Sağ</option>
          </select>

          {/* Seçimi temizle butonu */}
          <button
            onClick={clearSelection}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Seçimi Kaldır
          </button>
        </div>
      ) : (
        <p>Bir alan seçmek için üzerine tıklayın.</p>
      )}
    </div>
  );
};

export default EditOptions;
