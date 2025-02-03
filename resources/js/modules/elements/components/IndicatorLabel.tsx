import { IconType } from "react-icons";

type IndicatorLabelProps = {
    Icon: IconType;
    value: string | number;
    color?: string;
    background?: string;
    iconSize?: number;
    fixedWidth?: boolean;
};

const IndicatorLabel = ({
    Icon,
    value,
    color = "gray-500",
    background = "gray-100",
    iconSize = 6,
    fixedWidth = true,
}: IndicatorLabelProps) => {
    const sz = `h-${iconSize} w-${iconSize}`;
    return (
        <div
            className={`text-sm flex items-center justify-center py-2 px-3 shadow-md rounded-md text-${color} bg-${background} ${
                fixedWidth && "w-20"
            }`}
        >
            <Icon className={`mr-1 ${sz} text-${color}`} />
            <span>{value}</span>
        </div>
    );
};

export default IndicatorLabel;
