import FormBuilder from "@/app/components/form_builder/page";
import { useState } from "react";

interface HomePageProps {
    onLogout: () => void; // Çıkış yapıldığında tetiklenecek fonksiyon
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
    const [previewFields, setPreviewFields] = useState<any[]>([]);

    const addFieldToPreview = (field: any) => {
        setPreviewFields((prevFields) => [...prevFields, field]);
    };

    const handleImageChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const updatedField = {
                ...previewFields.find((field) => field.id === id),
                value: URL.createObjectURL(file),
            };
            setPreviewFields(
                previewFields.map((field) => (field.id === id ? updatedField : field))
            );
        }
    };

    return (
        <div className="h-screen grid grid-cols-[1fr_2fr_1fr] gap-4 p-4 bg-gray-100">
            <div className="bg-white shadow rounded p-4">
                <FormBuilder addFieldToPreview={addFieldToPreview} />
            </div>

            {/* Orta Panel - Form Önizlemesi */}
            <div className="bg-white shadow rounded p-8 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Form Önizlemesi</h1>
                <div className="w-full h-[500px] border-2 border-dashed border-gray-300 bg-gray-50">
                    {previewFields.map((field, index) => (
                        <div key={index} className="mb-4">
                            {field.type === "text" && <input type="text" placeholder={field.label || "Metin Alanı"} className="border p-2 w-full mb-2" />}
                            {field.type === "textarea" && <textarea placeholder={field.label || "Metin Kutusu"} className="border p-2 w-full mb-2" rows={3} />}
                            {field.type === "checkbox" && <div className="flex items-center"><input type="checkbox" className="mr-2" /><span>{field.label || "Onay Kutusu"}</span></div>}
                            {field.type === "image" && (
                                <div>
                                    <input
                                        type="file"
                                        className="mb-2"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(field.id, e)}
                                    />
                                    {field.value && (
                                        <div className="mt-2">
                                            <img
                                                src={field.value}
                                                alt="Uploaded"
                                                style={{ maxWidth: "100%", height: "auto" }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                            {field.type === "date" && <input type="date" className="mb-2 border p-2 w-full" />}
                            {field.type === "radio" && (
                                <div>
                                    {field.options?.map((option: string, i: number) => (
                                        <div key={i} className="flex items-center">
                                            <input type="radio" id={`${field.id}-option-${i}`} name={`radio-group-${field.id}`} value={option} className="mr-2" />
                                            <label htmlFor={`${field.id}-option-${i}`}>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {field.type === "file" && <input type="file" className="mb-2" />}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white shadow rounded p-4">
                <h2 className="text-lg font-bold mb-4">Düzenleme Seçenekleri</h2>
                <p>Buraya form düzenleme özellikleri ekleyebilirsiniz.</p>
            </div>
        </div>
    );
};


export default HomePage;
