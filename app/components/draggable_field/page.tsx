import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const DraggableField: React.FC<{ field: Field; moveField: (id: number, x: number, y: number) => void, handleFieldChange: (id: number, key: keyof Field, value: string) => void }> = ({ field, moveField, handleFieldChange }) => {
    const ref = useRef<HTMLDivElement>(null); // ref'i useRef ile oluşturuyoruz

    const [, drag] = useDrag(() => ({
        type: 'FIELD',
        item: field,
        end: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset()!;
            const x = field.x + delta.x;
            const y = field.y + delta.y;
            moveField(field.id, x, y);
        }
    }));

    // Drag işlevini ref'e bağlamak
    drag(ref);

    function renderField(field: Field): React.ReactNode {
        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)}
                        className="p-2 border"
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)}
                        className="p-2 border"
                    />
                );
            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        checked={field.value === 'true'}
                        onChange={(e) => handleFieldChange(field.id, 'value', e.target.checked ? 'true' : 'false')}
                    />
                );
            case 'image':
                return <input type="file" onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)} />;
            case 'date':
                return (
                    <input
                        type="date"
                        value={field.value}
                        onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)}
                        className="p-2 border"
                    />
                );
            case 'radio':
                return (
                    <div>
                        {field.options?.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    name={`radio-${field.id}`}
                                    value={option}
                                    checked={field.value === option}
                                    onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                );
            case 'file':
                return <input type="file" onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)} />;
            default:
                return null;
        }
    }


    return (
        <div
            ref={ref} // ref'i kullanıyoruz
            style={{
                position: 'absolute',
                left: `${field.x}px`,
                top: `${field.y}px`,
                padding: '10px',
                border: '1px solid #ccc',
                background: '#f9f9f9',
                cursor: 'move',
                width: 'auto',
                height: 'auto'
            }}
        >
            <ResizableBox width={200} height={100} minConstraints={[100, 50]} maxConstraints={[300, 150]}>
                {renderField(field)} {/* renderField fonksiyonunu kullanarak form elemanını render ediyoruz */}
            </ResizableBox>
        </div>
    );
};

export default DraggableField;
