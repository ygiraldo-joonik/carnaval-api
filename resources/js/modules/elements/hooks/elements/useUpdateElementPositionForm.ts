import { use, useEffect, useState } from "react";
import { useManageElementsContext } from "../../context/ManageElementsContext";

const useUpdateElementPositionForm = () => {
    const {
        block,
        element,
        blocks,
        loadingUpdateElementPosition,
        updateElementPosition,
    } = useManageElementsContext();

    const [blockId, setBlockId] = useState<number>(block.id || NaN);
    const [order, setOrder] = useState<number>(block.id || NaN);

    const blockOptions = blocks.map((block) => ({
        value: block.id,
        label: `${block.name}${
            block.id === element.block_id ? " (actual)" : ""
        }`,
    }));

    const selectedBlockElements =
        blocks.find((b) => b.id === blockId)?.elements || [];

    const orderOptions = selectedBlockElements.reduce(
        (options, currentElement, index) => {
            options.push({
                value: index + 1,
                label: `${currentElement.order}: ${currentElement.name}${
                    currentElement.id === element.id ? " (actual)" : ""
                }`,
            });

            // Add an option to move the element to the end of the block
            if (
                index + 1 === selectedBlockElements.length &&
                element.block_id != blockId
            )
                options.push({
                    value: index + 2,
                    label: "Al final",
                });

            return options;
        },
        [] as { value: number; label: string }[]
    );

    if (selectedBlockElements.length == 0 && element.block_id != blockId)
        orderOptions.push({
            value: 1,
            label: "Al final",
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const block = blocks.find((b) => b.id === blockId);
        if (!block) return;

        updateElementPosition(element, block, order);
    };

    const positionChanged =
        blockId !== element.block_id || order !== element.order;

    useEffect(() => {
        setBlockId(block.id || NaN);
    }, [block]);

    useEffect(() => {
        setOrder(element.order || NaN);
    }, [element]);

    useEffect(() => {
        if (blockId !== block.id) setOrder(selectedBlockElements.length + 1);
        else setOrder(element.order || selectedBlockElements.length + 1);
    }, [blockId]);

    return {
        element,
        block,
        blockId,
        setBlockId,
        order,
        setOrder,
        blockOptions,
        orderOptions,
        loading: loadingUpdateElementPosition,
        handleSubmit,
        positionChanged,
    };
};

export default useUpdateElementPositionForm;
