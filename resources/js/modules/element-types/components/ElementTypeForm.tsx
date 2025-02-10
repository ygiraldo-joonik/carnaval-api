import React, { useState, useEffect } from "react";
import { ElementType, ElementTypeFormData } from "@/types/element-type.d";
import { TwitterPicker } from "react-color";
import { Commet } from "react-loading-indicators";

type ElementTypeFormProps = {
    elementType: ElementType;
    onSubmit: (data: ElementTypeFormData) => void;
    loading: boolean;
};

const ElementTypeForm: React.FC<ElementTypeFormProps> = ({
    elementType,
    loading,
    onSubmit,
}) => {
    const [formState, setFormState] = useState<ElementTypeFormData>({
        id: elementType.id,
        name: elementType.name || "",
        color: elementType.color || "",
        description: elementType.description || "",
        people_count: elementType.people_count || 0,
        length: elementType.length || 0,
    });

    useEffect(() => {
        if (elementType) {
            setFormState(elementType);
        }
    }, [elementType]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const setColor = (color: string) => setFormState({ ...formState, color });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {elementType.id ? "Guardar" : "Crear"} tipo de elemento
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="color"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Color
                    </label>
                    <div className="flex items-center">
                        <div
                            className="w-6 h-6 rounded-full mt-1"
                            style={{
                                backgroundColor: formState.color,
                                marginLeft: 10,
                            }}
                        ></div>
                        <input
                            required
                            type="text"
                            name="color"
                            id="color"
                            value={formState.color}
                            onChange={handleChange}
                            className="mt-1 ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                    <TwitterPicker
                        color={formState.color}
                        onChangeComplete={(c) => setColor(c.hex)}
                        styles={{
                            default: {
                                input: {
                                    width: "88px",
                                    height: "14px",
                                },
                            },
                        }}
                    />
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formState.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        rows={4}
                    />
                </div>

                <div>
                    <label
                        htmlFor="people_count"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Número de personas aprox
                    </label>
                    <input
                        type="number"
                        name="people_count"
                        id="people_count"
                        value={formState.people_count}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="length"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Longitud (mts)
                    </label>
                    <input
                        type="number"
                        name="length"
                        id="length"
                        value={formState.length}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        required
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    disabled={loading}
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent btn-primary px-4 py-2 text-sm font-medium "
                >
                    {elementType.id ? "Guardar" : "Crear"}

                    {loading && (
                        <>
                            &nbsp;
                            <Commet color="#fff" style={{ fontSize: "3px" }} />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ElementTypeForm;
