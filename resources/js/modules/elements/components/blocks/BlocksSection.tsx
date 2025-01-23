import { useManageElementsContext } from "../../context/ManageElementsContext";
import BlockItem from "./BlockItem";

const BlocksSection = () => {
    const { blocks } = useManageElementsContext();
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
            <div className="text-gray-900 bg-white overflow-hidden shadow-xl sm:rounded-lg">
                <div className="overflow-x-auto sm:rounded-lg">
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
