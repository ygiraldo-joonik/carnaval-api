import { IconType } from "react-icons";
import { ReactNode } from "react";
import Tooltip from "@/Components/Tooltip";

type TableIconButtonType = {
    disabled?: boolean;
    Icon: IconType;
    onClick?: () => void;
    title: string | ReactNode | null;
    size?: number;
};

const TableIconButton = ({
    disabled = false,
    Icon,
    onClick = () => {},
    title = null,
    size = 5,
}: TableIconButtonType) => {
    const sz = `h-${size} w-${size}`;
    const btn = (
        <button
            title="Mover elemento hacia abajo"
            className="flex justify-between items-center p-1 rounded-lg"
            disabled={disabled}
            onClick={onClick}
        >
            <Icon
                className={`${
                    disabled ? "text-gray-400" : "text-gray-700"
                } ${sz}`}
            />
        </button>
    );
    return (
        <>{title == null ? btn : <Tooltip content={title}>{btn}</Tooltip>}</>
    );
};

export default TableIconButton;
