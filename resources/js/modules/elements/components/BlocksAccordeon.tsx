import { Block } from "@/types/element";
import truncateText from "@/utils/transformers/truncateText";
import { Disclosure } from "@headlessui/react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import {
    MdArrowDownward,
    MdArrowUpward,
    MdDeleteOutline,
    MdOutlineEdit,
} from "react-icons/md";

export type BlocksAccordionProps = {
    blocks: Block[];
};

const BlocksAccordion = ({ blocks }: BlocksAccordionProps) => {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
            <div className="text-gray-900 bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div className="overflow-x-auto sm:rounded-lg">
                    {blocks.map((block, index) => (
                        <Disclosure defaultOpen={true} key={index}>
                            {({ open }) => (
                                <>
                                    <div
                                        className={`flex w-full justify-between items-center px-4 py-2 text-left text-lg font-medium text-gray-900 bg-gray-100  hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${
                                            index < block.elements.length - 1 &&
                                            "border-b-2"
                                        }`}
                                    >
                                        <span>
                                            <strong>
                                                Bloque {block.order}:
                                            </strong>{" "}
                                            {block.name}
                                        </span>

                                        <div className="flex items-center">
                                            <button
                                                className="flex justify-between items-center p-1 rounded-lg bg-gray-500 mr-2"
                                                disabled={
                                                    index == blocks.length - 1
                                                }
                                            >
                                                <MdArrowDownward className="w-5 h-5 text-gray-500" />
                                            </button>
                                            <button
                                                className="flex justify-between items-center p-1 rounded-lg bg-gray-500 mr-2"
                                                disabled={index == 0}
                                            >
                                                <MdArrowUpward className="w-5 h-5 text-gray-500" />
                                            </button>
                                            <button className="flex justify-between items-center p-1 rounded-lg bg-gray-500 mr-2 ml-4">
                                                <MdDeleteOutline className="w-5 h-5 text-gray-500" />
                                            </button>
                                            <button className="flex justify-between items-center p-1 rounded-lg bg-gray-500 mr-2">
                                                <MdOutlineEdit className="w-5 h-5 text-gray-500" />
                                            </button>
                                            <Disclosure.Button className="flex justify-between items-center p-1 rounded-lg bg-gray-500 ml-4">
                                                {open ? (
                                                    <FaChevronUp
                                                        className={`${
                                                            open
                                                                ? "rotate-180 transform"
                                                                : ""
                                                        } w-5 h-5 text-gray-500`}
                                                    />
                                                ) : (
                                                    <FaChevronDown
                                                        className={`${
                                                            open
                                                                ? "rotate-180 transform"
                                                                : ""
                                                        } w-5 h-5 text-gray-500`}
                                                    />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                    <Disclosure.Panel className="px-4 py-2 text-sm text-gray-500">
                                        <p>
                                            {truncateText(
                                                block.description,
                                                50
                                            )}
                                        </p>
                                        <div className="mt-3 space-y-2 overflow-hidden shadow-sm sm:rounded-md">
                                            {block.elements.map(
                                                (element, index) => (
                                                    <div
                                                        key={element.id}
                                                        className={`py-2 px-2 bg-gray-100 shadow-sm hover:bg-gray-200 ${
                                                            index <
                                                                block.elements
                                                                    .length -
                                                                    1 &&
                                                            "border-b-2"
                                                        }`}
                                                    >
                                                        <div className="flex items-center">
                                                            <div
                                                                className="mr-2 w-2.5 h-2.5 h-4 w-4 rounded-full mr-3"
                                                                style={{
                                                                    backgroundColor:
                                                                        element
                                                                            .type
                                                                            .color,
                                                                }}
                                                            />
                                                            <span className="text-gray-800 text-base font-semibold">
                                                                {element.name}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="mr-2 w-2.5 h-2.5 h-4 w-4  mr-3 " />
                                                            <span className="text-gray-500 text-sm">
                                                                {truncateText(
                                                                    element.description,
                                                                    50
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlocksAccordion;
