import { Block } from "@/types/element.d";
import truncateText from "@/utils/transformers/truncateText";
import { Disclosure } from "@headlessui/react";
import BlockItemActions from "./BlockItemActions";
import ElementItem from "../elements/ElementItem";

type BlockItemProps = {
    block: Block;
    index: number;
    length: number;
};

const BlockItem = ({ block, length, index }: BlockItemProps) => {
    return (
        <Disclosure defaultOpen={true}>
            {({ open }) => (
                <>
                    <div
                        className={`flex w-full justify-between items-center px-4 py-2 text-left text-lg font-medium text-gray-900 bg-gray-100  hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${
                            index < length - 1 && "border-b-2"
                        }`}
                    >
                        <span>
                            <strong>Bloque {block.order}:</strong> {block.name}
                        </span>

                        <BlockItemActions
                            block={block}
                            length={length}
                            index={index}
                            open={open}
                        />
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
                </>
            )}
        </Disclosure>
    );
};

export default BlockItem;
