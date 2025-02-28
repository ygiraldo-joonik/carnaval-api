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
import { GrDocumentUpload } from "react-icons/gr";
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
        onBulkCreateElements,
        loadingUpdateBlocksOrder,
    } = useManageElementsContext();

    return (
        <>
            <TableIconButton
                title="Subir csv"
                onClick={() => onBulkCreateElements(block)}
                Icon={GrDocumentUpload}
                hidden={!open}
            />

            <TableIconButton
                title="Crear elemento"
                onClick={() => onCreateElement(block)}
                Icon={PiRowsPlusBottom}
                size={6}
                hidden={!open}
            />

            <TableIconButton
                title="Eliminar bloque"
                onClick={() => onDeleteBlock(block)}
                Icon={MdDeleteOutline}
                hidden={!open}
            />

            <TableIconButton
                title="Editar bloque"
                onClick={() => onEditBlock(block)}
                Icon={MdOutlineEdit}
                hidden={!open}
            />

            <TableIconButton
                title="Mover bloque hacia abajo"
                onClick={() => onUpdateBlockOrder(block, "down")}
                Icon={MdArrowDownward}
                disabled={index == length - 1 || loadingUpdateBlocksOrder}
                hidden={!open}
            />

            <TableIconButton
                title="Mover bloque hacia arriba"
                onClick={() => onUpdateBlockOrder(block, "up")}
                Icon={MdArrowUpward}
                disabled={index == 0 || loadingUpdateBlocksOrder}
                hidden={!open}
            />

            <Disclosure.Button
                className="flex justify-between items-center p-1 rounded-lg ml-4"
                title={open ? "Cerrar" : "Abrir"}
            >
                <FaChevronDown
                    className={`transform transition-transform ${
                        open ? "rotate-180" : ""
                    } w-5 h-5 text-gray-500`}
                />
            </Disclosure.Button>
        </>
    );
};

export const BlockItemActionsNotDisclosure = ({
    block,
    length,
    index,
}: BlockItemActionsProps) => {
    const {
        onCreateElement,
        onEditBlock,
        onDeleteBlock,
        onUpdateBlockOrder,
        onBulkCreateElements,
        loadingUpdateBlocksOrder,
    } = useManageElementsContext();

    return (
        <>
            <TableIconButton
                title="Subir csv"
                onClick={() => onBulkCreateElements(block)}
                Icon={GrDocumentUpload}
            />

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
        </>
    );
};

export default BlockItemActions;
