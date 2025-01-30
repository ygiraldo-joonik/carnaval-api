import { IconType } from "react-icons";

type IndicatorLabelProps = {
    Icon: IconType;
    value: string | number;
    color?: string;
    background?: string;
    iconSize?: number;
};

const IndicatorLabel = ({
    Icon,
    value,
    color = "gray-500",
    background = "gray-100",
    iconSize = 6,
}: IndicatorLabelProps) => {
    const sz = `h-${iconSize} w-${iconSize}`;
    return (
        <div
            className={`text-sm flex items-center py-2 px-3 shadow-md rounded-md text-${color} bg-${background}`}
        >
            <Icon className={`mr-1 ${sz} text-${color}`} />
            <span>{value}</span>
        </div>
    );
};

export default IndicatorLabel;
