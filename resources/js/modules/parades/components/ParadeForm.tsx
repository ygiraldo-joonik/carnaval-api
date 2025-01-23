import { defaultParade, Parade } from "@/types/parade.d";
import { useState, useEffect } from "react";
import { Commet } from "react-loading-indicators";

type ParadeFormProps = {
    parade: Parade;
    onSubmit: (data: Parade) => void;
    loading: boolean;
};

export default function ParadeForm({
    parade,
    onSubmit,
    loading,
}: ParadeFormProps) {
    const [formState, setFormState] = useState<Parade>(defaultParade);

    useEffect(() => {
        if (parade) setFormState(parade);
    }, [parade]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {parade.id ? "Editar" : "Crear"} desfile
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
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

                <div>
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="date"
                    >
                        Fecha
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formState.date}
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

                <div>
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="distance"
                    >
                        Distancia (KM)
                    </label>
                    <input
                        type="number"
                        id="distance"
                        name="distance"
                        value={formState.distance}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="start_location"
                    >
                        Lugar Inicial
                    </label>
                    <input
                        type="text"
                        id="start_location"
                        name="start_location"
                        value={formState.start_location}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="end_location"
                    >
                        Lugar Final
                    </label>
                    <input
                        type="text"
                        id="end_location"
                        name="end_location"
                        value={formState.end_location}
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
                    {parade.id ? "Editar" : "Crear"}

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
