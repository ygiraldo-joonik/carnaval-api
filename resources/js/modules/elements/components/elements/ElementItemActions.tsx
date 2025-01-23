import { Block, Element } from "@/types/element.d";
import {
    MdArrowDownward,
    MdArrowUpward,
    MdDeleteOutline,
    MdOutlineEdit,
} from "react-icons/md";
import { useManageElementsContext } from "../../context/ManageElementsContext";

type ElementItemActionsProps = {
    element: Element;
    block: Block;
    index: number;
    length: number;
};

const ElementItemActions = ({
    element,
    block,
    length,
    index,
}: ElementItemActionsProps) => {
    const {
        onEditElement,
        onDeleteElement,
        onUpdateElementOrder,
        loadingUpdateElementsOrder,
    } = useManageElementsContext();
    return (
        <div className="flex items-center">
            <button
                className="flex justify-between items-center p-1 rounded-lg  mr-2"
                onClick={() => onDeleteElement(element)}
            >
                <MdDeleteOutline className="w-5 h-5 text-gray-500" />
            </button>
            <button
                onClick={() => onEditElement(element)}
                className="flex justify-between items-center p-1 rounded-lg  mr-2"
            >
                <MdOutlineEdit className="w-5 h-5 text-gray-500" />
            </button>
            <button
                className="flex justify-between items-center p-1 rounded-lg  mr-2 ml-4"
                disabled={index == length - 1 || loadingUpdateElementsOrder}
                onClick={() => onUpdateElementOrder(element, block, "down")}
            >
                <MdArrowDownward
                    className={`w-5 h-5 ${
                        index == length - 1 || loadingUpdateElementsOrder
                            ? "text-gray-300"
                            : "text-gray-500"
                    }`}
                />
            </button>
            <button
                className="flex justify-between items-center p-1 rounded-lg "
                disabled={index == 0 || loadingUpdateElementsOrder}
                style={{
                    marginRight: "2.2rem",
                }}
                onClick={() => onUpdateElementOrder(element, block, "up")}
            >
                <MdArrowUpward
                    className={`w-5 h-5 ${
                        index == 0 || loadingUpdateElementsOrder
                            ? "text-gray-300"
                            : "text-gray-500"
                    }`}
                />
            </button>
        </div>
    );
};

export default ElementItemActions;
