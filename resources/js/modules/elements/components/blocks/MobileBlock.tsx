import React from "react";
import { FaChevronUp } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { Block } from "@/types/element";
import IndicatorLabel from "../IndicatorLabel";
import MobileElementCard from "./MobileElementItem";

function MobileBlock({ block }: { block: Block }) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="mx-4">
            <div className="rounded-lg overflow-hidden mb-4">
                <div className="bg-accent p-2 grid grid-cols-[1fr_max-content] items-center gap-4">
                    <div>
                        <p className="text-sm mb-1">{block.name}</p>

                        <div className="flex gap-2">
                            <IndicatorLabel
                                Icon={MdOutlinePerson}
                                value={block.people_count}
                                background="white"
                                size="small"
                                iconSize={4}
                            />
                            <IndicatorLabel
                                Icon={AiOutlineColumnWidth}
                                value={`${block.length}m`}
                                background="white"
                                size="small"
                                iconSize={4}
                            />
                        </div>
                    </div>
                    <div
                        className="w-[100px] h-[60px] grid place-content-center hover:bg-yellow-200 rounded-full cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <FaChevronUp
                            size={35}
                            className={`transition-transform duration-300 ${
                                open ? "rotate-0" : "rotate-180"
                            }`}
                        />
                    </div>
                </div>
                <div className="bg-white p-2">actions</div>
            </div>
            {open &&
                block.elements?.map((ele) => (
                    <MobileElementCard key={ele.id} element={ele} />
                ))}
        </div>
    );
}

export default MobileBlock;
