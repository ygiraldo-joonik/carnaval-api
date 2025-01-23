import { ElementType } from "@/types/element-type.d";
import { Block, defaultElement, Element } from "@/types/element.d";
import { useState, useEffect } from "react";
import { Commet } from "react-loading-indicators";

type ElementFormProps = {
    block: Block;
    element: Element;
    elementTypes: ElementType[];
    onSubmit: (data: Element) => void;
    loading: boolean;
};

export default function ElementForm({
    element,
    block,
    elementTypes,
    onSubmit,
    loading,
}: ElementFormProps) {
    const [formState, setFormState] = useState<Element>(defaultElement);
    useEffect(() => {
        if (element) setFormState(element);
    }, [element]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: name === "element_type_id" ? parseInt(value) : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="font-semibold text-gray-500 ">{block.name}</h3>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {formState.id ? "Editar" : "Crear"} elemento{" "}
                {element.id && `${element.name}`}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="name"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="description"
                    >
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows={4}
                    />
                </div>
                <div className="sm:col-span-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="element_type_id"
                    >
                        Tipo de Elemento
                    </label>
                    <select
                        id="element_type_id"
                        name="element_type_id"
                        value={formState.element_type_id || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Seleccione un tipo
                        </option>
                        {elementTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="sm:col-span-1">
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="people_count"
                    >
                        Cantidad de personas
                    </label>
                    <input
                        type="number"
                        id="people_count"
                        name="people_count"
                        value={formState.people_count}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div className="sm:col-span-1">
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="length"
                    >
                        Longitud (mts)
                    </label>
                    <input
                        type="number"
                        id="length"
                        name="length"
                        value={formState.length}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    disabled={loading}
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {formState.id ? "Editar" : "Crear"}
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
}
