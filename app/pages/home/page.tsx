import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormBuilder from "@/app/components/form_builder/page";
import DraggableField from "@/app/components/draggable_field/page";

interface HomePageProps {
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  const [previewFields, setPreviewFields] = useState<any[]>([]);

  // Yeni form alanını preview listesine ekleme
  const addFieldToPreview = (field: any) => {
    setPreviewFields((prevFields) => [
      ...prevFields,
      { ...field, x: 0, y: 0 },
    ]);
  };

  // Alanı hareket ettirme
  const moveField = (id: number, x: number, y: number) => {
    setPreviewFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, x, y } : field
      )
    );
  };

  // Alanı güncelleme
  const updateField = (id: number, updatedData: Partial<any>) => {
    setPreviewFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedData } : field
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen grid grid-cols-[1fr_2fr_1fr] gap-4 p-4 bg-gray-100">
        {/* Form Builder */}
        <div className="bg-white shadow rounded p-4">
          <FormBuilder addFieldToPreview={addFieldToPreview} />
        </div>

        {/* Form Preview */}
        <div className="bg-white shadow rounded p-8 relative">
          <h1 className="text-2xl font-bold mb-4">Form Önizlemesi</h1>
          <div className="w-full h-[500px] border-2 border-dashed border-gray-300 bg-gray-50 relative">
            {previewFields.map((field) => (
              <DraggableField
                key={field.id}
                field={field}
                moveField={moveField}
                updateField={updateField}
              />
            ))}
          </div>
        </div>

        {/* Edit Options */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-4">Düzenleme Seçenekleri</h2>
          <p>Buraya form düzenleme özellikleri ekleyebilirsiniz.</p>
        </div>
      </div>
    </DndProvider>
  );
};

export default HomePage;



//selam next.js de ön-izleme kısmındaki seçilmiş öğenin özellikleri sağdaki panelde gözükmesini istiyorum bunun için güncel kodlarım bunlar
//olup güncel kodların üstüne istediğim senaryoyu yazar mısın?