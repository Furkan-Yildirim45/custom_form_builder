import React from "react";
import { useState } from "react";

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
  // Geçici değişiklikler için state
  const [tempField, setTempField] = useState<any>(selectedField);

  // selectedField değiştiğinde tempField'ı da güncelle
  React.useEffect(() => {
    setTempField(selectedField);
  }, [selectedField]);

  // Değişiklikleri uygula
  const applyChanges = () => {
    if (tempField) {
      updateField(tempField.id, tempField);
    }
  };

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
              setTempField({ ...tempField, label: e.target.value })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Genişlik düzenleme */}
          <label className="block mb-2">Genişlik (px):</label>
          <input
            type="number"
            value={tempField.style?.width || 200}
            onChange={(e) =>
              setTempField({
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
              setTempField({
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
              setTempField({
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
              setTempField({
                ...tempField,
                style: {
                  ...tempField.style,
                  borderRadius: Number(e.target.value),
                },
              })
            }
            className="border p-2 w-full mb-4"
          />

          {/* Uygula butonu */}
          <button
            onClick={applyChanges}
            className="bg-green-500 text-white py-2 px-4 rounded mb-2"
          >
            Uygula
          </button>

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
