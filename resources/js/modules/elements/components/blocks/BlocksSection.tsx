import { useManageElementsContext } from "../../context/ManageElementsContext";
import BlockItem from "./BlockItem";
import MobileBlock from "./MobileBlock";

const BlocksSection = () => {
    const { blocks } = useManageElementsContext();
    return (
        <div className="relative max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
            <div className="hidden lg:!block text-gray-900">
                <div className="flex flex-col gap-6 align-start">
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
            <div className="block lg:hidden mobile-view-block-elements">
                {blocks.map((block, index) => (
                    <MobileBlock key={index} block={block} />
                ))}
            </div>
        </div>
    );
};

export default BlocksSection;
