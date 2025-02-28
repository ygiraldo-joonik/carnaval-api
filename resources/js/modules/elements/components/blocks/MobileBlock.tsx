import React from "react";
import { FaChevronUp } from "react-icons/fa";
import { MdOutlinePerson } from "react-icons/md";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { Block } from "@/types/element";
import IndicatorLabel from "../IndicatorLabel";
import MobileElementCard from "./MobileElementItem";
import { BlockItemActionsNotDisclosure } from "./BlockItemActions";

function MobileBlock({
    block,
    index,
    length,
}: {
    block: Block;
    index: number;
    length: number;
}) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="mx-4 mt-4">
            <div className="rounded-lgmb-4 sticky top-0 mb-4 z-[1]">
                <div
                    className={`transition-bg duration-200 ${
                        open ? "bg-accent" : "bg-slate-300"
                    } p-2 grid grid-cols-[1fr_max-content] items-center gap-4 rounded-t-md`}
                >
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
                        className="w-[100px] h-[60px] grid place-content-center hover:bg-white hover:bg-opacity-40 rounded-full cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <FaChevronUp
                            size={20}
                            className={`transition-transform duration-300 ${
                                open ? "rotate-0" : "rotate-180"
                            }`}
                        />
                    </div>
                </div>
                <div className="bg-white flex justify-between p-4 shadow-md rounded-b-md">
                    <BlockItemActionsNotDisclosure
                        block={block}
                        index={index}
                        length={length}
                        open={open}
                    />
                </div>
            </div>
            {open && (
                <div className="flex flex-col gap-4">
                    {block.elements?.map((ele, index) => (
                        <MobileElementCard
                            key={ele.id}
                            element={ele}
                            block={block}
                            index={index}
                            length={block.elements?.length ?? 0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MobileBlock;
