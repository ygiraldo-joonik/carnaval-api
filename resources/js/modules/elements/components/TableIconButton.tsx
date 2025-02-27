import { IconType } from "react-icons";
import { ReactNode } from "react";
import Tooltip from "@/Components/Tooltip";

type TableIconButtonType = {
    disabled?: boolean;
    Icon: IconType;
    onClick?: () => void;
    title: string | ReactNode | null;
    size?: number;
    hidden?: boolean;
};

const TableIconButton = ({
    disabled = false,
    Icon,
    onClick = () => {},
    title = null,
    size = 5,
    hidden = false,
}: TableIconButtonType) => {
    const sz = `h-${size} w-${size}`;
    const btn = (
        <button
            title={title as string}
            className={`flex justify-between items-center p-1 rounded-lg ${
                hidden && "opacity-0"
            }`}
            disabled={disabled || hidden}
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
        <>
            {title == null || hidden ? (
                btn
            ) : (
                <Tooltip content={title}>{btn}</Tooltip>
            )}
        </>
    );
};

export default TableIconButton;
