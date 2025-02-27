import { IoAnalyticsSharp, IoCalendarOutline } from "react-icons/io5";
import {
    MdOutlineSocialDistance,
    MdOutlinePersonOutline,
    MdOutlineEdit,
    MdList,
    MdOutlineViewTimeline,
} from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LuClock2 } from "react-icons/lu";
import { Parade } from "@/types/parade.d";
import truncateText from "@/utils/transformers/truncateText";
import { fromMinutesToHours } from "@/utils/transformers/fromMinutesToHours";
// import { RiPageSeparator } from "react-icons/ri";
import dayjs from "../../../utils/dayjs";
import { formatNumber } from "@/utils/formatNumber";
import MenuButton from "@/Components/MenuButton";
import { ParadesListProps } from "./ParadesList";

type ParadeCardProps = {
    parade: Parade;
} & Pick<
    ParadesListProps,
    "onEdit" | "onManageElements" | "onControlParade" | "onAnalisysParade"
>;

function ParadeCard({
    parade,
    onEdit,
    onManageElements,
    onAnalisysParade,
}: ParadeCardProps) {
    const menuItems = [
        {
            label: "Editar",
            icon: MdOutlineEdit,
            onClick: () => onEdit(parade),
        },
        {
            label: "Elementos",
            icon: MdList,
            onClick: () => onManageElements(parade.id!),
        },
        {
            label: "Analisis",
            icon: IoAnalyticsSharp,
            onClick: () => onAnalisysParade(parade.id!),
        },

        {
            label: "Control",
            icon: MdOutlineViewTimeline,
            onClick: () => onAnalisysParade(parade.id!),
        },

        // MdOutlineViewTimeline
        // IoAnalyticsSharp
        // MdList
    ];

    return (
        <div className="flex flex-col justify-between bg-white border border-neutral-100 rounded-lg p-4 w-full sm:w-[49%] md:w-[32%] relative">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        {parade.name}
                    </h2>
                    <p className="text-gray-700 font-bold">
                        {truncateText(parade.description || "")}
                    </p>
                </div>
                {/* <button className="text-gray-500 hover:text-gray-700 w-12 h-12 flex items-center justify-center hover:bg-gray-200 rounded-full transition duration-200 ease-in-out">
                    <BsThreeDotsVertical className="text-gray-900 w-6 h-6" />
                </button> */}
                <MenuButton items={menuItems} />
            </div>

            <div className="flex flex-col">
                <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="flex items-center justify-center border border-gray-200 p-2 rounded-lg">
                        <span className="mr-2">
                            <IoCalendarOutline />
                        </span>
                        <span className="text-gray-800 text-sm capitalize">
                            {dayjs(parade.date).format("DD MMM, YYYY")}
                        </span>
                    </div>
                    <div className="flex items-center justify-center border border-gray-200 p-2 rounded-lg">
                        <span className="mr-2">
                            <DistanceIcon />
                        </span>
                        <span className="text-gray-800 text-sm">
                            {formatNumber(parade.distance)} m
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr_max-content] gap-2 mt-3">
                    <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg">
                        <span className="mr-2">
                            <MdOutlinePersonOutline />
                        </span>
                        <span className="text-gray-800 text-sm">
                            {formatNumber(parade.people_count)}
                        </span>
                    </div>
                    <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg">
                        <span className="mr-2">
                            <MdOutlineSocialDistance />
                        </span>
                        <span className="text-gray-800 text-sm">
                            {formatNumber(parade.elements_length)} m
                        </span>
                    </div>
                    <div className="max-w-[150px] flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg">
                        <span className="mr-2">
                            <LuClock2 />
                        </span>
                        <span className="text-sm">
                            {fromMinutesToHours(parade.duration)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DistanceIcon() {
    return (
        <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22.3883 6.51632C22.3368 4.18662 20.3244 2.2915 17.9051 2.2915C15.4849 2.2915 13.4725 4.1867 13.422 6.51632C13.4001 7.49204 13.5297 8.86509 14.7446 10.8212C15.8613 12.6258 17.2668 13.4358 17.9061 13.4358C18.4301 13.4358 19.6841 12.887 21.0601 10.8356C22.2988 8.98704 22.4103 7.48544 22.3883 6.51632ZM20.2491 10.2943C19.0734 12.0504 18.1119 12.4477 17.9099 12.4629C17.7318 12.4439 16.6103 11.9827 15.5736 10.3095C14.495 8.57059 14.3788 7.37947 14.3978 6.53815C14.4397 4.73539 16.0129 3.26709 17.9053 3.26709C19.7986 3.26709 21.3716 4.7335 21.4126 6.53815C21.4318 7.37475 21.3326 8.67252 20.2464 10.2942L20.2491 10.2943Z"
                fill="#37474F"
                stroke="#37474F"
                strokeWidth="0.5"
            />
            <path
                d="M17.904 5.08911C16.9235 5.08911 16.126 5.88663 16.126 6.86713C16.126 7.84759 16.9235 8.64515 17.904 8.64515C18.8845 8.64515 19.682 7.84761 19.682 6.86713C19.682 5.88666 18.8845 5.08911 17.904 5.08911ZM17.904 7.67231C17.46 7.67231 17.1016 7.31118 17.1016 6.87001C17.1016 6.42884 17.4628 6.06771 17.904 6.06771C18.3451 6.06771 18.7063 6.42884 18.7063 6.87001C18.7063 7.31118 18.3451 7.67231 17.904 7.67231Z"
                fill="#37474F"
                stroke="#37474F"
                strokeWidth="0.5"
            />
            <path
                d="M16.6902 15.6759H6.19077C5.2446 15.6759 4.47567 14.9051 4.47567 13.9609C4.47567 13.0166 5.24652 12.2457 6.19077 12.2457H13.0673C13.336 12.2457 13.5552 12.0266 13.5552 11.7579C13.5552 11.4892 13.336 11.27 13.0673 11.27H6.19077C4.70815 11.27 3.5 12.4773 3.5 13.9607C3.5 15.4434 4.70725 16.6516 6.19077 16.6516H16.6892C17.6353 16.6516 18.4043 17.4224 18.4043 18.3667C18.4043 19.3109 17.6333 20.0817 16.6892 20.0817H13.2742C13.0617 19.3691 12.4033 18.8479 11.6229 18.8479C10.6739 18.8479 9.90112 19.6216 9.90112 20.5696C9.90112 21.5186 10.6748 22.2914 11.6229 22.2914C12.4033 22.2914 13.0617 21.7692 13.2742 21.0574H16.6892C18.1718 21.0574 19.38 19.8502 19.38 18.3667C19.38 16.8841 18.1737 15.6759 16.6902 15.6759ZM11.623 21.3177C11.2105 21.3177 10.877 20.9832 10.877 20.5717C10.877 20.1591 11.2114 19.8256 11.623 19.8256C12.0356 19.8256 12.3691 20.1601 12.3691 20.5717C12.3691 20.9842 12.0346 21.3177 11.623 21.3177Z"
                fill="#37474F"
                stroke="#37474F"
                strokeWidth="0.5"
            />
        </svg>
    );
}

export default ParadeCard;
