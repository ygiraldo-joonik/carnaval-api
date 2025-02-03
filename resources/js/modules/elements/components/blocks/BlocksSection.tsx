import { useManageElementsContext } from "../../context/ManageElementsContext";
import BlockItem from "./BlockItem";

const BlocksSection = () => {
    const { blocks } = useManageElementsContext();
    return (
        <div className="relative max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
            <div className="text-gray-900">
                <div className="flex flex-col gap-6 overflow-x-auto align-start">
                    {blocks.map((block, index) => (
                        <BlockItem
                            key={block.id}
                            block={block}
                            index={index}
                            length={blocks.length}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlocksSection;
