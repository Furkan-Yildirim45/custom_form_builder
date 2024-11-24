import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'react-resizable/css/styles.css';
import DraggableField from '../draggable_field/page'; 

const FormBuilder: React.FC<{ addFieldToPreview: (field: Field) => void }> = ({
  addFieldToPreview,
}) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [radioOptions, setRadioOptions] = useState<string[]>([]);
  const [isRadioOptionsVisible, setIsRadioOptionsVisible] = useState(false);

  const addField = (type: FieldType) => {
    const newField: Field = { id: Date.now(), type, label: "", value: "", x: 0, y: 0 };

    if (type === 'radio' && radioOptions.length > 0) {
      newField.options = radioOptions;
    }

    setFields([...fields, newField]);
    addFieldToPreview(newField);

    if (type === 'radio') {
      setRadioOptions([]);
      setIsRadioOptionsVisible(false);
    }
  };

  const handleFieldChange = (id: number, key: keyof Field, value: string) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
  };

  const handleRadioOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const options = e.target.value.split(',').map((option) => option.trim());
    setRadioOptions(options);
  };

  // Drag and Drop için işlevler
  const moveField = (id: number, x: number, y: number) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, x, y } : field
      )
    );
  };

  return (
    // DndProvider ile FormBuilder'ı sarmalıyoruz
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-lg font-bold mb-4">Form Elemanları</h2>
        <div className="flex flex-col space-y-2">
          <button className="btn-primary" onClick={() => addField('text')}>Metin Alanı Ekle</button>
          <button className="btn-primary" onClick={() => addField('textarea')}>Metin Kutusu Ekle</button>
          <button className="btn-primary" onClick={() => addField('checkbox')}>Onay Kutusu Ekle</button>
          <button className="btn-primary" onClick={() => addField('image')}>Resim Ekle</button>
          <button className="btn-primary" onClick={() => addField('date')}>Tarih Ekle</button>
          <button className="btn-primary" onClick={() => setIsRadioOptionsVisible(true)}>Radyo Butonları Ekle</button>
          <button className="btn-primary" onClick={() => addField('file')}>Dosya Yükleme Ekle</button>

          {isRadioOptionsVisible && (
            <div>
              <label>Radyo Butonları Seçenekleri (Virgülle ayırın):</label>
              <input type="text" placeholder="Seçenekleri girin" className="border p-2" onChange={handleRadioOptionsChange} />
              <button className="btn-primary mt-2" onClick={() => {
                setIsRadioOptionsVisible(false);
                addField('radio');
              }}>
                Seçenekleri Ekle
              </button>
            </div>
          )}
        </div>

        {/* Form Elemanlarının Ön İzlemesi */}
        <div className="mt-4 relative">
          {fields.map((field) => (
            <DraggableField
              key={field.id}
              field={field}
              moveField={moveField}
              handleFieldChange={handleFieldChange}  // handleFieldChange fonksiyonunu da buraya eklemeyi unutmayın
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
