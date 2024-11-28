import React, { useState } from "react";

const renderField = (field: Field) => {
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
          {field.options?.map((option, idx) => (
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
          {field.options?.map((option, idx) => (
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

const FormBuilder: React.FC<{
  addFieldToPreview: (field: Field) => void;
  removeField: (id: number) => void;
  selectedField: Field | null;
  setSelectedField: (field: Field | null) => void;
}> = ({ addFieldToPreview, removeField, selectedField, setSelectedField }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [radioOptions, setRadioOptions] = useState<string[]>([]);
  const [isRadioOptionsVisible, setIsRadioOptionsVisible] = useState(false);

  // Yeni form öğesi ekleme
  const addField = (type: FieldType) => {
    const newField: Field = {
      id: Date.now(),
      type,
      label: "",
      value: "",
      x: 0, // Varsayılan değer
      y: 0, // Varsayılan değer
    };

    if (type === "radio" && radioOptions.length > 0) {
      newField.options = radioOptions;
    }

    setFields([...fields, newField]);
    addFieldToPreview(newField); // Parent bileşene öğe ekleme

    if (type === "radio") {
      setRadioOptions([]); // Seçenekleri sıfırlama
      setIsRadioOptionsVisible(false);
    }
  };

  // Alan üzerinde değişiklik yapma (etiket vb.)
  const handleFieldChange = (id: number, key: keyof Field, value: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
  };

  // Radyo butonları seçenekleri değişimi
  const handleRadioOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const options = e.target.value.split(",").map((option) => option.trim());
    setRadioOptions(options);
  };

  // Silme işlemi
  const handleDeleteField = () => {
    if (selectedField) {
      removeField(selectedField.id); // Silme işlemi
      setSelectedField(null); // Seçimi sıfırla
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow relative">
      <h2 className="text-lg font-bold mb-4">Form Elemanları</h2>
      <div className="flex flex-col space-y-2">
        {/* Form öğesi eklemek için butonlar */}
        <button className="btn-primary" onClick={() => addField("text")}>Metin Ekle</button>
        <button className="btn-primary" onClick={() => addField("password")}>Şifre Ekle</button>
        <button className="btn-primary" onClick={() => addField("email")}>E-posta Ekle</button>
        <button className="btn-primary" onClick={() => addField("number")}>Yaş Ekle</button>
        <button className="btn-primary" onClick={() => addField("tel")}>Telefon Numarası Ekle</button>
        <button className="btn-primary" onClick={() => addField("checkbox")}>Onay Ekle</button>
        <button className="btn-primary" onClick={() => addField("radio")}>Radyo Butonları Ekle</button>
        <button className="btn-primary" onClick={() => addField("select")}>Dropdown Seçimi Ekle</button>
        <button className="btn-primary" onClick={() => addField("image")}>Resim Ekle</button>
        <button className="btn-primary" onClick={() => addField("textarea")}>Metin Kutusu Ekle</button>
        <button className="btn-primary" onClick={() => addField("file")}>Dosya Ekle</button>
        <button className="btn-primary" onClick={() => addField("date")}>Tarih Ekle</button>
        <button className="btn-primary" onClick={() => addField("range")}>Aralık Ekle</button>

        {isRadioOptionsVisible && (
          <div>
            <label>Radyo Butonları Seçenekleri (Virgülle ayırın):</label>
            <input
              type="text"
              placeholder="Seçenekleri girin"
              className="border p-2"
              onChange={handleRadioOptionsChange}
            />
            <button
              className="btn-primary mt-2"
              onClick={() => {
                setIsRadioOptionsVisible(false);
                addField("radio");
              }}
            >
              Seçenekleri Ekle
            </button>
          </div>
        )}
      </div>

      {/* Seçili Alan için özellikler */}
      {selectedField && (
        <div className="mt-4">
          <div>
            <input
              type="text"
              id="fieldLabel"
              value={selectedField.label}
              onChange={(e) =>
                handleFieldChange(selectedField.id, "label", e.target.value)
              }
              className="border p-2 w-full"
            />
          </div>
          {selectedField.type === "radio" && selectedField.options && (
            <div className="mt-2">
              <label>Radyo Seçenekleri</label>
              <div>
                {selectedField.options.map((option, index) => (
                  <div key={index}>
                    <input type="radio" name={`radio-${selectedField.id}`} />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Silme butonu, bir öğe seçildiğinde görünsün */}
      {selectedField && (
        <div
          style={{
            position: "absolute",
            bottom: "20px", // Butonun alt kısmına yerleştirilmesi
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%", // Ekran boyutuna göre uyarlanabilir
          }}
        >
          <button
            className="btn-danger w-full"
            onClick={handleDeleteField}
            style={{
              padding: "10px",
              fontSize: "16px",
              textAlign: "center",
              backgroundColor: "red",
              borderRadius: "8px",
              color: "white",
            }}
          >
            Alanı Sil
          </button>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;


