import { Element } from "@/types/element";
import truncateText from "@/utils/transformers/truncateText";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    MdOutlinePersonOutline,
    MdOutlineSocialDistance,
    MdArrowDownward,
    MdArrowUpward,
} from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";

export default function MobileElementCard({ element }: { element: Element }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                    COLECTIVO DE NIÑOS DE LA ALCALDÍA - ZOOLOGICO
                    {element.name}
                </h2>
                <button className="text-gray-500 hover:text-gray-700 w-12 h-12 aspect-square flex items-center justify-center hover:bg-gray-200 rounded-full transition duration-200 ease-in-out">
                    <BsThreeDotsVertical className="text-gray-900 w-6 h-6" />
                </button>
            </div>
            <div className=" mt-4 grid grid-cols-[max-content_1fr] gap-1 items-center">
                <div className="flex items-center">
                    <div className="bg-[#31B8CC] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm mr-2">
                        {element.order}
                    </div>
                </div>
                <p className="text-gray-700">
                    {truncateText(element.description, 50)}
                </p>
            </div>

            <div className="grid grid-cols-[1fr_1fr_max-content_max-content] gap-2 mt-4">
                <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg">
                    <MdOutlinePersonOutline className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-800 text-sm">
                        {element.people_count}
                    </span>
                </div>
                <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg">
                    <AiOutlineColumnWidth className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-800 text-sm">{`${element.length}m`}</span>
                </div>
                <div className="flex space-x-2">
                    <button className="flex items-center justify-center bg-gray-100 p-2 rounded-lg min-w-[60px] h-[50px]">
                        <MdArrowDownward className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="flex items-center justify-center bg-gray-100 p-2 rounded-lg  min-w-[60px] h-[50px]">
                        <MdArrowUpward className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}
