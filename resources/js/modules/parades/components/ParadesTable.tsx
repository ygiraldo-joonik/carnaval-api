import IndicatorLabel from "@/modules/elements/components/IndicatorLabel";
import TableIconButton from "@/modules/elements/components/TableIconButton";
import { Parade } from "@/types/parade.d";
import truncateText from "@/utils/transformers/truncateText";
import { MdOutlineEdit, MdDeleteOutline, MdList } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { LuTimer } from "react-icons/lu";
import { fromMinutesToHours } from "@/utils/transformers/fromMinutesToHours";


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
                <div className="sticky-header-table-container overflow-x-auto overflow-y-auto relative sm:rounded-lg">
                    <table className="min-w-full bg-white sm:rounded-lg">
                        <thead className="bg-accent">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Nombre
                                </th>
                                {/* <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Descripción
                                </th> */}
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Fecha
                                </th>
                                <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Recorrido (m)
                                </th>
                                {/* <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Lugar de inicio
                                </th> */}
                                {/* <th className="px-4 py-2 text-left font-medium text-gray-700">
                                    Lugar de fin
                                </th> */}
                                <th className="px-4 py-2 text-left font-medium text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {parades.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-4 text-center"
                                    >
                                        No results found
                                    </td>
                                </tr>
                            )}
                            {parades.map((parade) => (
                                <tr className="border-t" key={parade.id}>
                                    <td className="px-4 py-4">{parade.name}</td>
                                    {/* <td className="px-4 py-4">
                                        {truncateText(
                                            parade.description ?? "",
                                            30
                                        )}
                                    </td> */}
                                    <td className="px-4 py-4 ">
                                        {new Intl.DateTimeFormat("es-ES", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }).format(new Date(parade.date))}
                                    </td>
                                    <td className="px-4 py-4 text-left">
                                        {parade.distance}
                                    </td>
                                    {/* <td className="px-4 py-4">
                                        {parade.start_location}
                                    </td> */}
                                    {/* <td className="px-4 py-4">
                                        {parade.end_location}
                                    </td> */}
                                    <td className="px-4 py-4 flex items-center gap-6">
                                        <IndicatorLabel
                                                value={parade.people_count}
                                                Icon={MdOutlinePerson}
                                        />
                                        <IndicatorLabel
                                            value={`${parade.elements_length}m`}
                                            Icon={AiOutlineColumnWidth}
                                        />

                                        <IndicatorLabel
                                            value={fromMinutesToHours(parade.total_duration)}
                                            Icon={LuTimer}
                                            background="accent2"
                                            color="white"
                                            fixedWidth={false}
                                        />
                                        <div className="flex-grow"></div>
                                        <TableIconButton
                                            title="Elementos"
                                            onClick={() =>
                                                onManageElements(parade.id!)
                                            }
                                            Icon={MdList}
                                        />

                                        <TableIconButton
                                            title="Editar desfile"
                                            onClick={() => onEdit(parade)}
                                            Icon={MdOutlineEdit}
                                        />

                                        {/* <TableIconButton
                                            title="Eliminar desfile"
                                            onClick={() => onDelete(parade)}
                                            Icon={MdDeleteOutline}
                                        /> */}
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
