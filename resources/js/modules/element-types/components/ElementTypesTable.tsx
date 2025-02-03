import TableIconButton from "@/modules/elements/components/TableIconButton";
import { ElementType } from "@/types/element-type.d";
import truncateText from "@/utils/transformers/truncateText";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

type ElementTypesTableProps = {
    elementTypes: ElementType[];
    onDelete: (id: ElementType) => void;
    onEdit: (id: ElementType) => void;
};

export default function ElementTypesTable(props: ElementTypesTableProps) {
    const { onDelete, onEdit, elementTypes } = props;

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
            <div className=" text-gray-900 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="sticky-header-table-container overflow-x-auto overflow-y-auto relative sm:rounded-lg">
                    <table className="min-w-full bg-white sm:rounded-lg ">
                        <thead className="bg-accent">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-700"></th>
                                <th className="px-4  py-2 text-left font-medium text-gray-700">
                                    Nombre
                                </th>

                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Descripción
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Cant Personas
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Longitud (mts)
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {elementTypes.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-2 text-center"
                                    >
                                        No se encontraron resultados
                                    </td>
                                </tr>
                            )}

                            {elementTypes.map((item) => (
                                <tr className="border-t" key={item.id}>
                                    <td className="px-4 py-2">
                                        <span
                                            className="inline-block w-4 h-4 rounded-full"
                                            style={{
                                                backgroundColor: item.color,
                                            }}
                                        ></span>
                                    </td>
                                    <td className="px-4 py-2">{item.name}</td>

                                    <td className="px-4 py-2">
                                        {truncateText(item.description)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {item.people_count}
                                    </td>
                                    <td className="px-4 py-2">{item.length}</td>

                                    <td className="px-4 py-2 flex items-center gap-6">
                                        <TableIconButton
                                            title="Editar tipo de elemento"
                                            onClick={() => onEdit(item)}
                                            Icon={MdOutlineEdit}
                                        />
                                        <TableIconButton
                                            title="Eliminar tipo de elemento"
                                            onClick={() => onDelete(item)}
                                            Icon={MdDeleteOutline}
                                        />
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
