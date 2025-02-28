import clsx from "clsx";
import {
    MdOutlinePersonOutline,
    MdArrowDownward,
    MdArrowUpward,
    MdDriveFileMoveOutline,
    MdOutlineEdit,
} from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { Block, Element } from "@/types/element";
import truncateText from "@/utils/transformers/truncateText";
import MenuButton from "@/Components/MenuButton";
import { useManageElementsContext } from "../../context/ManageElementsContext";

export default function MobileElementCard({
    element,
    block,
    index,
    length,
}: {
    element: Element;
    block: Block;
    index: number;
    length: number;
}) {
    const {
        onEditElement,
        onUpdateElementOrder,
        onUpdateElementPosition,
        loadingUpdateElementsOrder,
    } = useManageElementsContext();
    const actions = [
        {
            label: "Mover elemento",
            icon: MdDriveFileMoveOutline,
            onClick: () => onUpdateElementPosition(element, block),
        },
        {
            label: "Editar elemento",
            icon: MdOutlineEdit,
            onClick: () => onEditElement(element),
        },
        // {
        //     label: "Mover elemento hacia arriba",
        //     icon: MdArrowUpward,
        //     onClick: () => onUpdateElementOrder(element, block, "up"),
        //     disabled: index == 0 || loadingUpdateElementsOrder,
        // },
        // {
        //     label: "Mover elemento hacia abajo",
        //     icon: MdArrowDownward,
        //     onClick: () => onUpdateElementOrder(element, block, "down"),
        //     disabled: index == length - 1 || loadingUpdateElementsOrder,
        // },
    ];
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-md font-bold text-gray-900">
                    {element.name}
                </h2>
                <MenuButton items={actions} />
            </div>
            <div className=" mt-2 grid grid-cols-[max-content_1fr] gap-1 items-center">
                <div className="flex items-center">
                    <div className="bg-[#31B8CC] text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                        {element.order}
                    </div>
                </div>
                <p className="text-gray-700">
                    {truncateText(element.description, 50)}
                </p>
            </div>

            <div className="grid grid-cols-[1fr_1fr_max-content_max-content] gap-2 mt-3">
                <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg">
                    <MdOutlinePersonOutline className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-800 text-sm">
                        {element.people_count}
                    </span>
                </div>
                <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg">
                    <AiOutlineColumnWidth className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-800 text-sm">{`${element.length}m`}</span>
                </div>
                <div className="flex space-x-2">
                    <button
                        disabled={
                            index == length - 1 || loadingUpdateElementsOrder
                        }
                        className={clsx([
                            "flex items-center justify-center p-2 rounded-lg min-w-[60px] h-[50px]",
                            index == length - 1 || loadingUpdateElementsOrder
                                ? "bg-slate-300 opacity-30 shadow-none"
                                : "bg-gray-100 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)]",
                        ])}
                        onClick={() =>
                            onUpdateElementOrder(element, block, "down")
                        }
                    >
                        <MdArrowDownward className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        disabled={index == 0 || loadingUpdateElementsOrder}
                        className={clsx([
                            "flex items-center justify-center p-2 rounded-lg min-w-[60px] h-[50px]",
                            index == 0 || loadingUpdateElementsOrder
                                ? "bg-slate-300 opacity-30 shadow-none"
                                : "bg-gray-100 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_3px_1px_-2px_rgba(0,0,0,0.20)]",
                        ])}
                    >
                        <MdArrowUpward
                            onClick={() =>
                                onUpdateElementOrder(element, block, "up")
                            }
                            className="w-5 h-5 text-gray-600"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
