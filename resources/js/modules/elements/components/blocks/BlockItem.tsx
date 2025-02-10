import { Block } from "@/types/element.d";
import truncateText from "@/utils/transformers/truncateText";
import { Disclosure } from "@headlessui/react";
import BlockItemActions from "./BlockItemActions";
import ElementItem from "../elements/ElementItem";
// import { countBlockPeople } from "../../transformers/countPeople";
// import { calcBlockLength } from "../../transformers/calcLength";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { MdOutlinePerson } from "react-icons/md";
import IndicatorLabel from "../IndicatorLabel";
import { useEffect, useRef, useState } from "react";

type BlockItemProps = {
    block: Block;
    index: number;
    length: number;
};

const BlockItem = ({ block, length, index }: BlockItemProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [headerWidth, setHeaderWidth] = useState<null | number>(null);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component is mounted

        const { top, width } = panelRef.current?.getBoundingClientRect() || {};

        // Set the header width when the component is mounted
        if (width) setHeaderWidth(width);

        // Handle the scroll event
        const handleScroll = (initialTop: number) => () => {
            if (panelRef.current) {
                const { scrollY } = window;
                // Set the sticky state when the scroll position is greater than the top position
                setIsSticky(initialTop <= scrollY);
            }
        };

        const handleResize = () => {
            const { width } = panelRef.current?.getBoundingClientRect() || {};
            // Set the header width when the window is resized
            if (width) setHeaderWidth(width);
        };

        if (top != null) {
            const handleScrollFunction = handleScroll(top);

            // window.addEventListener("scroll", handleScrollFunction);
            // window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("scroll", handleScrollFunction);
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    return (
        <Disclosure defaultOpen={true}>
            {({ open }) => (
                <div
                    ref={panelRef}
                    className="bg-white rounded shadow w-full"
                >
                    <div className="h-16 sticky top-0">
                        <div
                            className={`flex w-full justify-between items-center px-4 text-left text-lg font-medium text-gray-900 ${
                                index < length - 1 && "border-b-2"
                            } ${open ? "bg-accent" : "bg-gray-200"}`}
                            style={{
                                position: isSticky ? "fixed" : "relative",
                                top: isSticky ? "0" : "auto",
                                ...(isSticky && headerWidth
                                    ? { width: headerWidth }
                                    : {}),
                                boxSizing: "border-box",
                            }}
                        >
                            <span className="inline-block py-4">
                                {/* <strong>Bloque {block.order}:</strong>{" "} */}
                                {block.name}
                            </span>

                            <div className="flex items-center gap-6">
                                <IndicatorLabel
                                    value={block.people_count}
                                    Icon={MdOutlinePerson}
                                />
                                <IndicatorLabel
                                    value={`${block.length}m`}
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
