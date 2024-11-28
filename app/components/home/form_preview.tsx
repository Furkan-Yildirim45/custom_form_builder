import DraggableField from "../draggable_field/page";

interface FormPreviewProps {
    previewFields: any[];
    moveField: (id: number, x: number, y: number) => void;
    updateField: (id: number, updatedData: Partial<any>) => void;
    selectedField: any;
    setSelectedField: (field: any) => void;
  }
  
  const FormPreview: React.FC<FormPreviewProps> = ({
    previewFields,
    moveField,
    updateField,
    selectedField,
    setSelectedField,
  }) => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Form Önizlemesi</h1>
        <div className="w-full h-[500px] border-2 border-dashed border-gray-300 bg-gray-50 relative">
          {previewFields.map((field) => (
            <DraggableField
              key={field.id}
              field={field}
              moveField={moveField}
              updateField={updateField}
              onSelect={() => setSelectedField(field)}
              isSelected={selectedField?.id === field.id}
            />
          ))}
        </div>
      </div>
    );
  };

  export default FormPreview;
