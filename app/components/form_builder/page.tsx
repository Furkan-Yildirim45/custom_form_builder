import React, { useState, useEffect, useRef } from "react";

const FormBuilder: React.FC<{
  addFieldToPreview: (field: Field) => void;
  removeField: (id: number) => void; // Accept removeField function from parent
  selectedField: Field | null; // Accept selectedField to display delete button
  setSelectedField: (field: Field | null) => void; // Accept setSelectedField function
}> = ({
  addFieldToPreview,
  removeField,
  selectedField,
  setSelectedField,
}) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [radioOptions, setRadioOptions] = useState<string[]>([]);
  const [isRadioOptionsVisible, setIsRadioOptionsVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  // Ekran yüksekliğini dinamik olarak almak için event listener ekleme
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div className="flex flex-col space-y-2" style={{ height: "calc(100vh - 100px)" }}>
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
              backgroundColor: "#f44336", // Kırmızı renk
              color: "#fff",
              borderRadius: "5px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            Seçili Alanı Sil
          </button>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;



