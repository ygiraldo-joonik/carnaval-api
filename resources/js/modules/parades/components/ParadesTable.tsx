import { Parade } from "@/types/parade.d";
import truncateText from "@/utils/transformers/truncateText";
import { MdOutlineEdit, MdDeleteOutline, MdList } from "react-icons/md";

type ParadesTableProps = {
    parades: Parade[];
    onDelete: (parade: Parade) => void;
    onEdit: (parade: Parade) => void;
    onManageElements: (id: number) => void;
};

export default function ParadesTable(props: ParadesTableProps) {
    const { parades, onDelete, onEdit, onManageElements } = props;

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
            <div className="text-gray-900 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="overflow-x-auto sm:rounded-lg">
                    <table className="min-w-full bg-white sm:rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Nombre
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Descripción
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Fecha
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Distancia (KM)
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Lugar de inicio
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Lugar de fin
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {parades.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-2 text-center"
                                    >
                                        No results found
                                    </td>
                                </tr>
                            )}
                            {parades.map((parade) => (
                                <tr className="border-t" key={parade.id}>
                                    <td className="px-4 py-2">{parade.name}</td>
                                    <td className="px-4 py-2">
                                        {truncateText(
                                            parade.description ?? "",
                                            30
                                        )}
                                    </td>
                                    <td className="px-4 py-2 ">
                                        {parade.date}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {parade.distance}
                                    </td>
                                    <td className="px-4 py-2">
                                        {parade.start_location}
                                    </td>
                                    <td className="px-4 py-2">
                                        {parade.end_location}
                                    </td>
                                    <td className="px-4 py-2 flex">
                                        <a
                                            role="button"
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() =>
                                                onManageElements(parade.id!)
                                            }
                                        >
                                            <MdList />
                                        </a>
                                        <a
                                            role="button"
                                            className="text-blue-500 hover:text-blue-700 ml-2"
                                            onClick={() => onEdit(parade)}
                                        >
                                            <MdOutlineEdit />
                                        </a>
                                        <a
                                            role="button"
                                            className="text-blue-500 hover:text-blue-700 ml-2"
                                            onClick={() => onDelete(parade)}
                                        >
                                            <MdDeleteOutline />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
