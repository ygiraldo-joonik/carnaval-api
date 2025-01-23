import { Block } from "@/types/element.d";
import { Disclosure } from "@headlessui/react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { PiRowsPlusBottom } from "react-icons/pi";
import {
    MdArrowDownward,
    MdArrowUpward,
    MdDeleteOutline,
    MdOutlineEdit,
} from "react-icons/md";
import { useManageElementsContext } from "../../context/ManageElementsContext";

type BlockItemActionsProps = {
    block: Block;
    index: number;
    length: number;
    open: boolean;
};

const BlockItemActions = ({
    block,
    length,
    index,
    open,
}: BlockItemActionsProps) => {
    const {
        onCreateElement,
        onEditBlock,
        onDeleteBlock,
        onUpdateBlockOrder,
        loadingUpdateBlocksOrder,
    } = useManageElementsContext();

    return (
        <div className="flex items-center">
            <button
                className="flex justify-between items-center p-1 rounded-lg  mr-2"
                onClick={() => onCreateElement(block)}
            >
                <PiRowsPlusBottom className="w-6 h-6 text-gray-500" />
            </button>

            <button
                onClick={() => onDeleteBlock(block)}
                className="flex justify-between items-center p-1 rounded-lg  mr-2 ml-4"
            >
                <MdDeleteOutline className="w-5 h-5 text-gray-500" />
            </button>
            <button
                onClick={() => onEditBlock(block)}
                className="flex justify-between items-center p-1 rounded-lg  mr-2"
            >
                <MdOutlineEdit className="w-5 h-5 text-gray-500" />
            </button>
            <button
                className="flex justify-between items-center p-1 rounded-lg mr-2 ml-4"
                disabled={index == length - 1 || loadingUpdateBlocksOrder}
            >
                <MdArrowDownward
                    onClick={() => onUpdateBlockOrder(block, "down")}
                    className={`w-5 h-5  ${
                        index == length - 1 || loadingUpdateBlocksOrder
                            ? "text-gray-300"
                            : "text-gray-500"
                    }`}
                />
            </button>
            <button
                onClick={() => onUpdateBlockOrder(block, "up")}
                className="flex justify-between items-center p-1 rounded-lg  mr-2"
                disabled={index == 0 || loadingUpdateBlocksOrder}
            >
                <MdArrowUpward
                    className={`w-5 h-5 ${
                        index == 0 || loadingUpdateBlocksOrder
                            ? "text-gray-300"
                            : "text-gray-500"
                    }`}
                />
            </button>
            <Disclosure.Button className="flex justify-between items-center p-1 rounded-lg  ml-4">
                {open ? (
                    <FaChevronUp
                        className={`${
                            open ? "rotate-180 transform" : ""
                        } w-5 h-5 text-gray-500`}
                    />
                ) : (
                    <FaChevronDown
                        className={`${
                            open ? "rotate-180 transform" : ""
                        } w-5 h-5 text-gray-500`}
                    />
                )}
            </Disclosure.Button>
        </div>
    );
};

export default BlockItemActions;
