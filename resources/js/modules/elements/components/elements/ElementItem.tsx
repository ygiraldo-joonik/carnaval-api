import { Block, Element } from "@/types/element.d";
import truncateText from "@/utils/transformers/truncateText";
import ElementItemActions from "./ElementItemActions";

type ElementItemProps = {
    element: Element;
    block: Block;
    index: number;
    length: number;
};

const ElementItem = ({ element, block, length, index }: ElementItemProps) => {
    return (
        <div
            key={element.id}
            className={`py-2 px-2 bg-gray-100 shadow-sm hover:bg-gray-200 ${
                index < length - 1 && "border-b-2"
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div
                        className="mr-2  h-4 w-4 rounded-full"
                        style={{
                            backgroundColor: element?.type?.color ?? "#fff",
                        }}
                    />
                    <span className="text-gray-800 text-base font-semibold">
                        {element.name}
                    </span>
                </div>

                <ElementItemActions
                    block={block}
                    element={element}
                    length={length}
                    index={index}
                />
            </div>
            <div className="flex items-center">
                <div className="mr-2 w-2.5 h-2.5 h-4 w-4  mr-3 " />
                <span className="text-gray-500 text-sm">
                    {truncateText(element.description, 50)}
                </span>
            </div>
        </div>
    );
};

export default ElementItem;
