import { IconType } from "react-icons";

type IndicatorLabelProps = {
    Icon: IconType;
    value: string | number;
    color?: string;
    background?: string;
    iconSize?: number;
    fixedWidth?: boolean;
    size?: "small" | "default";
};

const IndicatorLabel = ({
    Icon,
    value,
    color = "gray-500",
    background = "gray-100",
    iconSize = 6,
    fixedWidth = true,
    size = "default",
}: IndicatorLabelProps) => {
    const sz = `h-${iconSize} w-${iconSize}`;
    const padding = size === "small" ? "py-1 px-2" : "py-2 px-3";
    const textSize = size === "small" ? "text-xs" : "text-sm";
    const width = fixedWidth ? (size === "small" ? "w-16" : "w-20") : "";

    return (
        <div
            className={`${textSize} flex items-center justify-center ${padding} shadow-md rounded-md text-${color} bg-${background} ${width}`}
        >
            <Icon className={`mr-1 ${sz} text-${color}`} />
            <span>{value}</span>
        </div>
    );
};

export default IndicatorLabel;
