import { Block, defaultBlock } from "@/types/element.d";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import useUpsertBlock from "./useUpsertBlock";
import useDeleteBlock from "./useDeleteBlock";
import { Parade } from "@/types/parade.d";
import useUpdateBlocksOrder from "./useUpdateBlocksOrder";
import { ReorderType } from "../../context/ManageElementsContext";

export const defaultUseManageBlocks = {
    blocks: [],
    clearBlock: () => {},
    block: defaultBlock,
    onUpsertElement: (block: Block) => {},
    openBlockModal: false,
    openDeleteBlockModal: false,
    filterBlocks: (search: string) => {},
    handleUpsertBlockModalClose: () => {},
    handleDeleteBlockModalClose: () => {},
    onEditBlock: (selectedBlock: Block) => {},
    onDeleteBlock: (selectedBlock: Block) => {},
    onCreateBlock: () => {},
    upsertBlock: (block: Block) => Promise.resolve(),
    deleteBlock: (id: number, name: string) => Promise.resolve(),
    onUpdateBlockOrder: (block: Block, type: ReorderType) => {},
    onUpdateOrderSuccess: () => {},
    loadingBlockForm: false,
    loadingBlockDelete: false,
    loadingUpdateBlocksOrder: false,
    refreshBlocks: () => {},
};

const useManageBlocks = (parade: Parade) => {
    const paradeBlocks: Block[] = parade.blocks || [];
    const [blocks, setBlocks] = useState<Block[]>(paradeBlocks);

    const [openBlockModal, setOpenBlockModal] = useState<boolean>(false);

    const [openDeleteBlockModal, setOpenDeleteBlockModal] =
        useState<boolean>(false);

    const [block, setBlock] = useState<Block>(defaultBlock);

    const filterBlocks = (search: string) => {
        if (search === "") {
            setBlocks(paradeBlocks);
        } else {
            setBlocks(
                paradeBlocks
                    .filter(
                        (item) =>
                            item.name
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            item.description
                                ?.toLowerCase()
                                .includes(search.toLowerCase()) ||
                            item.elements?.some(
                                (element) =>
                                    element.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) ||
                                    element.description
                                        ?.toLowerCase()
                                        .includes(search.toLowerCase())
                            )
                    )
                    .map((item) => {
                        const clonedItem = { ...item };
                        clonedItem.elements = clonedItem.elements?.filter(
                            (element) =>
                                element.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                element.description
                                    ?.toLowerCase()
                                    .includes(search.toLowerCase())
                        );

                        return clonedItem;
                    })
            );
        }
    };

    const handleUpsertBlockModalClose = () => {
        setOpenBlockModal(false);
        setTimeout(() => setBlock(defaultBlock), 500);
    };

    const handleDeleteBlockModalClose = () => {
        setOpenDeleteBlockModal(false);
        setTimeout(() => setBlock(defaultBlock), 500);
    };

    const onEditBlock = (selectedBlock: Block) => {
        setBlock(selectedBlock);
        setOpenBlockModal(true);
    };

    const onDeleteBlock = (selectedBlock: Block) => {
        setBlock(selectedBlock);
        setOpenDeleteBlockModal(true);
    };

    const onCreateBlock = () => {
        setBlock(defaultBlock);
        setOpenBlockModal(true);
    };

    const onUpsertElement = (selectedBlock: Block) => {
        setBlock(selectedBlock);
    };

    const refreshBlocks = () =>
        router.get(
            route(route().current(), { id: parade.id }),
            {},
            {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            }
        );

    const onUpsertSuccess = () => {
        handleUpsertBlockModalClose();
        refreshBlocks();
    };

    const clearBlock = () => {
        setBlock(defaultBlock);
    };

    const onUpdateOrderSuccess = () => {
        refreshBlocks();
    };

    const onDeleteSuccess = () => {
        handleDeleteBlockModalClose();
        refreshBlocks();
    };

    const { loading: loadingBlockForm, upsertBlock } = useUpsertBlock(
        parade,
        onUpsertSuccess
    );

    const { loading: loadingUpdateBlocksOrder, updateBlocksOrder } =
        useUpdateBlocksOrder(parade, onUpdateOrderSuccess);

    const { loading: loadingBlockDelete, deleteBlock } =
        useDeleteBlock(onDeleteSuccess);

    const onUpdateBlockOrder = (block: Block, type: ReorderType) => {
        const paradeBlocks = parade.blocks || [];
        const blocks = paradeBlocks.reduce((blocks, currentBlock, index) => {
            if (currentBlock.id === block.id) {
                const nextElement = paradeBlocks[index + 1];
                const previousElement = paradeBlocks[index - 1];

                blocks.push(block);

                if (type === "up" && previousElement) {
                    blocks.push(previousElement);
                } else if (type === "down" && nextElement) {
                    blocks.push(nextElement);
                }
            }

            return blocks;
        }, [] as Block[]);

        updateBlocksOrder(blocks);
    };

    useEffect(() => {
        setBlocks(paradeBlocks);
    }, [paradeBlocks]);

    return {
        blocks,
        block,
        onUpsertElement,
        openBlockModal,
        openDeleteBlockModal,
        filterBlocks,
        handleUpsertBlockModalClose,
        handleDeleteBlockModalClose,
        onEditBlock,
        onDeleteBlock,
        onCreateBlock,
        upsertBlock,
        onUpdateBlockOrder,
        deleteBlock,
        loadingBlockForm,
        loadingBlockDelete,
        loadingUpdateBlocksOrder,
        onUpdateOrderSuccess,
        refreshBlocks,
        clearBlock,
    };
};

export default useManageBlocks;
