import IndicatorLabel from "@/modules/elements/components/IndicatorLabel";
import TableIconButton from "@/modules/elements/components/TableIconButton";
import { Parade } from "@/types/parade.d";
import {
    MdOutlineEdit,
    MdList,
    MdOutlinePerson,
    MdOutlineViewTimeline,
} from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { LuTimer } from "react-icons/lu";
import { fromMinutesToHours } from "@/utils/transformers/fromMinutesToHours";
import { IoAnalyticsSharp } from "react-icons/io5";

import ParadeCard from "./ParadeCard";

export type ParadesListProps = {
    parades: Parade[];
    onDelete: (parade: Parade) => void;
    onEdit: (parade: Parade) => void;
    onManageElements: (id: number) => void;
    onControlParade: (id: number) => void;
    onAnalisysParade: (id: number) => void;
};

export default function ParadesList(props: ParadesListProps) {
    const {
        parades,
        onControlParade,
        onAnalisysParade,
        onEdit,
        onManageElements,
    } = props;

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4 w-full">
            <div className="text-gray-900  shadow-sm sm:rounded-lg">
                <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(335px,1fr))]">
                    {/* {parades.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-4 py-4 text-center">
                                No results found
                            </td>
                        </tr>
                    )} */}
                    {parades.map((parade, i) => (
                        <ParadeCard
                            key={i}
                            parade={parade}
                            onControlParade={onControlParade}
                            onAnalisysParade={onAnalisysParade}
                            onEdit={onEdit}
                            onManageElements={onManageElements}
                        />
                        // <tr className="border-t" key={parade.id}>
                        //     <td className="px-4 py-4">{parade.name}</td>
                        //     {/* <td className="px-4 py-4">
                        //         {truncateText(
                        //             parade.description ?? "",
                        //             30
                        //         )}
                        //     </td> */}
                        //     <td className="px-4 py-4 ">
                        //         {dayjs(parade.date)
                        //             .tz("America/Bogota")
                        //             .format("D MMM YYYY")}
                        //     </td>
                        //     <td className="px-4 py-4 text-left">
                        //         {parade.distance}
                        //     </td>
                        //     {/* <td className="px-4 py-4">
                        //         {parade.start_location}
                        //     </td> */}
                        //     {/* <td className="px-4 py-4">
                        //         {parade.end_location}
                        //     </td> */}
                        //     <td className="px-4 py-4 flex items-center gap-6">
                        //         <IndicatorLabel
                        //             value={parade.people_count}
                        //             Icon={MdOutlinePerson}
                        //         />
                        //         <IndicatorLabel
                        //             value={`${parade.elements_length}m`}
                        //             Icon={AiOutlineColumnWidth}
                        //         />

                        //         <IndicatorLabel
                        //             value={fromMinutesToHours(
                        //                 parade.total_duration
                        //             )}
                        //             Icon={LuTimer}
                        //             background="accent2"
                        //             color="white"
                        //             fixedWidth={false}
                        //         />
                        //         <div className="flex-grow"></div>
                        //         <TableIconButton
                        //             title="Analisis"
                        //             onClick={() =>
                        //                 onAnalisysParade(parade.id!)
                        //             }
                        //             Icon={IoAnalyticsSharp}
                        //         />
                        //         <TableIconButton
                        //             title="Control"
                        //             onClick={() =>
                        //                 onControlParade(parade.id!)
                        //             }
                        //             Icon={MdOutlineViewTimeline}
                        //         />
                        //         <TableIconButton
                        //             title="Elementos"
                        //             onClick={() =>
                        //                 onManageElements(parade.id!)
                        //             }
                        //             Icon={MdList}
                        //         />

                        //         <TableIconButton
                        //             title="Editar desfile"
                        //             onClick={() => onEdit(parade)}
                        //             Icon={MdOutlineEdit}
                        //         />

                        //         {/* <TableIconButton
                        //             title="Eliminar desfile"
                        //             onClick={() => onDelete(parade)}
                        //             Icon={MdDeleteOutline}
                        //         /> */}
                        //     </td>
                        // </tr>
                    ))}
                </div>
            </div>
        </div>
    );
}
