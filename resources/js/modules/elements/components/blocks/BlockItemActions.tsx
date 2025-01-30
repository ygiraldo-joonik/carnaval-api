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
import TableIconButton from "../TableIconButton";

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
        <>
            <TableIconButton
                title="Crear elemento"
                onClick={() => onCreateElement(block)}
                Icon={PiRowsPlusBottom}
                size={6}
            />

            <TableIconButton
                title="Eliminar bloque"
                onClick={() => onDeleteBlock(block)}
                Icon={MdDeleteOutline}
            />

            <TableIconButton
                title="Editar bloque"
                onClick={() => onEditBlock(block)}
                Icon={MdOutlineEdit}
            />

            <TableIconButton
                title="Mover bloque hacia abajo"
                onClick={() => onUpdateBlockOrder(block, "down")}
                Icon={MdArrowDownward}
                disabled={index == length - 1 || loadingUpdateBlocksOrder}
            />

            <TableIconButton
                title="Mover bloque hacia arriba"
                onClick={() => onUpdateBlockOrder(block, "up")}
                Icon={MdArrowUpward}
                disabled={index == 0 || loadingUpdateBlocksOrder}
            />

            <Disclosure.Button
                className="flex justify-between items-center p-1 rounded-lg  ml-4"
                title={open ? "Cerrar" : "Abrir"}
            >
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
        </>
    );
};

export default BlockItemActions;
