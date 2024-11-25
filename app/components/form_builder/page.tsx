import React, { useState } from "react";

const FormBuilder: React.FC<{ addFieldToPreview: (field: Field) => void }> = ({
  addFieldToPreview,
}) => {
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
      y: 0  // Varsayılan değer
    };
    
    if (type === "radio" && radioOptions.length > 0) {
      newField.options = radioOptions;
    }

    setFields([...fields, newField]);
    addFieldToPreview(newField); // HomePage bileşenine öğe ekleme

    if (type === "radio") {
      setRadioOptions([]);
      setIsRadioOptionsVisible(false);
    }
  };

  // Alan üzerinde değişiklik yapma (etiket vb.)
  const handleFieldChange = (id: number, key: keyof Field, value: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
  };

  const handleRadioOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const options = e.target.value.split(",").map((option) => option.trim());
    setRadioOptions(options);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Form Elemanları</h2>
      <div className="flex flex-col space-y-2">
        {/* Form öğesi eklemek için butonlar */}
        <button className="btn-primary" onClick={() => addField("text")}>
          Metin Alanı Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("textarea")}>
          Metin Kutusu Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("checkbox")}>
          Onay Kutusu Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("image")}>
          Resim Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("date")}>
          Tarih Ekle
        </button>
        <button className="btn-primary" onClick={() => setIsRadioOptionsVisible(true)}>
          Radyo Butonları Ekle
        </button>
        <button className="btn-primary" onClick={() => addField("file")}>
          Dosya Yükleme Ekle
        </button>

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
    </div>
  );
};

export default FormBuilder;
