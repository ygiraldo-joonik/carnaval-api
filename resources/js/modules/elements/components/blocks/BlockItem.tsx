import { Block } from "@/types/element.d";
import truncateText from "@/utils/transformers/truncateText";
import { Disclosure } from "@headlessui/react";
import BlockItemActions from "./BlockItemActions";
import ElementItem from "../elements/ElementItem";
import { countBlockPeople } from "../../transformers/countPeople";
import { calcBlockLength } from "../../transformers/calcLength";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { MdOutlinePerson } from "react-icons/md";
import IndicatorLabel from "../IndicatorLabel";

type BlockItemProps = {
    block: Block;
    index: number;
    length: number;
};

const BlockItem = ({ block, length, index }: BlockItemProps) => {
    return (
        <Disclosure defaultOpen={true}>
            {({ open }) => (
                <div className="bg-white rounded mb-4 overflow-hidden shadow">
                    <div
                        className={`flex w-full justify-between items-center px-4 text-left text-lg font-medium text-gray-900 ${
                            index < length - 1 && "border-b-2"
                        } ${open ? "bg-accent" : "bg-gray-200"}`}
                    >
                        <span className="inline-block py-4">
                            <strong>Bloque {block.order}:</strong> {block.name}
                        </span>

                        <div className="flex items-center gap-6">
                            <IndicatorLabel
                                value={countBlockPeople(block)}
                                Icon={MdOutlinePerson}
                            />
                            <IndicatorLabel
                                value={`${calcBlockLength(block)}m`}
                                Icon={AiOutlineColumnWidth}
                            />

                            <BlockItemActions
                                block={block}
                                length={length}
                                index={index}
                                open={open}
                            />
                        </div>
                    </div>

                    <Disclosure.Panel className="px-4 py-2 text-sm text-gray-500">
                        <p>{truncateText(block.description, 50)}</p>

                        <div className="mt-3 space-y-2 overflow-hidden shadow-sm sm:rounded-md">
                            {block.elements?.map((element, index) => (
                                <ElementItem
                                    key={element.id}
                                    block={block}
                                    element={element}
                                    index={index}
                                    length={block.elements!.length}
                                />
                            ))}
                        </div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
};

export default BlockItem;
