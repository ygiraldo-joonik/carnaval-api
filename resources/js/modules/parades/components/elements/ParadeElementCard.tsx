import { ParadeAnalisysElement } from "@/types/parade";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es";
import { formatTimeHMS } from "@/utils/transformers/fromMinutesToHours";
import ElementPoleDetail from "./ElementPoleDetail";
import { Commet } from "react-loading-indicators";
import { Fragment } from "react/jsx-runtime";
import CloseIcon from "@/Components/Icons/CloseIcon";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("es");

type ParadeElementCardProps = {
    isSelected?: boolean;
    element: ParadeAnalisysElement;
    poles?: boolean;
    onClick?: (element: ParadeAnalisysElement) => void;
    onClose?: null | (() => void);
    loadingPoles?: boolean;
};
const ParadeElementCard = ({
    isSelected = false,
    element,
    poles = false,
    onClick = () => {},
    onClose = null,
    loadingPoles = false,
}: ParadeElementCardProps) => {
    return (
        <div
            id={`element-${element.id}`}
            onClick={() => onClick(element)}
            className={`${
                isSelected ? "bg-primary-light" : "bg-white"
            } rounded-lg shadow-md  flex flex-col  w-full cursor-pointer`}
        >
            {onClose != null && (
                <div className="flex justify-end p-4">
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
            )}
            <div className="flex flex-col space-y-2 w-full">
                <div className="flex items-center space-x-4 p-4">
                    <div className="bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {element.in_block_order}
                    </div>
                    <div className="flex flex-col">
                        <div className="text-gray-500 text-sm">
                            {element.block}
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {element.name}
                        </h2>
                    </div>
                </div>
                {loadingPoles ? (
                    <div className="flex items-center justify-center h-32 p-4 transition-all duration-300">
                        <Commet color="#45136A" style={{ fontSize: "10px" }} />
                    </div>
                ) : poles ? (
                    element.poles
                        .sort((a, b) => {
                            if (a.passed_at < b.passed_at) return 1;
                            if (a.passed_at > b.passed_at) return -1;
                            return 0;
                        })
                        .map((pole, i) => (
                            <Fragment key={i}>
                                <ElementPoleDetail pole={pole} />
                                {i < element.poles.length - 1 && (
                                    <div className="border-b-2 primary-border-light"></div>
                                )}
                            </Fragment>
                        ))
                ) : (
                    <ElementPoleDetail pole={element.last_pole} />
                )}
            </div>
        </div>
    );
};

export default ParadeElementCard;
