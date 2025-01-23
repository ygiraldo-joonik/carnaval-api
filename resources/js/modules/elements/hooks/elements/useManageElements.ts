import { Block, Element, defaultElement } from "@/types/element.d";
import { router } from "@inertiajs/react";
import { useState } from "react";
import useUpsertElement from "./useUpsertElement";
import useDeleteElement from "./useDeleteElement";
import useManageBlocks from "../blocks/useManageBlocks";
import { ManageElementsViewProps } from "../../views/ManageElementsView";
import useUpdateElementsOrder from "./useUpdateElementsOrder";
import { ReorderType } from "../../context/ManageElementsContext";

export const defaultUseManageElements = {
    element: defaultElement,
    openElementModal: false,
    openDeleteElementModal: false,
    handleUpsertElementModalClose: () => {},
    handleDeleteElementModalClose: () => {},
    onEditElement: (selectedElement: Element) => {},
    onDeleteElement: (selectedElement: Element) => {},
    onCreateElement: (block: Block) => {},
    upsertElement: (element: Element) => Promise.resolve(),
    deleteElement: (id: number, name: string) => Promise.resolve(),
    loadingElementForm: false,
    loadingElementDelete: false,
    loadingUpdateElementsOrder: false,
    onUpdateElementOrder: (
        element: Element,
        block: Block,
        type: ReorderType
    ) => {},
};

const useManageElements = ({
    onUpsertElement,
    onUpdateOrderSuccess,
    parade,
    block,
    refreshBlocks,
}: ReturnType<typeof useManageBlocks> &
    Pick<ManageElementsViewProps, "parade">) => {
    const [openElementModal, setOpenElementModal] = useState<boolean>(false);

    const [openDeleteElementModal, setOpenDeleteElementModal] =
        useState<boolean>(false);

    const [element, setElement] = useState<Element>(defaultElement);

    const handleUpsertElementModalClose = () => {
        setOpenElementModal(false);
        setTimeout(() => setElement(defaultElement), 500);
    };

    const handleDeleteElementModalClose = () => {
        setOpenDeleteElementModal(false);
        setTimeout(() => setElement(defaultElement), 500);
    };

    const onEditElement = (selectedElement: Element) => {
        setElement(selectedElement);
        setOpenElementModal(true);
    };

    const onDeleteElement = (selectedElement: Element) => {
        setElement(selectedElement);
        setOpenDeleteElementModal(true);
    };

    const onCreateElement = (block: Block) => {
        onUpsertElement(block);
        setElement(defaultElement);
        setOpenElementModal(true);
    };

    const onUpsertSuccess = () => {
        handleUpsertElementModalClose();
        refreshBlocks();
    };

    const onDeleteSuccess = () => {
        handleDeleteElementModalClose();
        refreshBlocks();
    };

    const { loading: loadingElementForm, upsertElement } = useUpsertElement(
        block,
        onUpsertSuccess
    );

    const { loading: loadingUpdateElementsOrder, updateElementsOrder } =
        useUpdateElementsOrder(onUpdateOrderSuccess);

    const { loading: loadingElementDelete, deleteElement } =
        useDeleteElement(onDeleteSuccess);

    const onUpdateElementOrder = (
        element: Element,
        block: Block,
        type: ReorderType
    ) => {
        const elements = (parade.blocks || []).reduce((elements, block) => {
            const blockElements = block.elements || [];

            blockElements.forEach((currentElement, index) => {
                if (currentElement.id === element.id) {
                    const nextElement = blockElements[index + 1];
                    const previousElement = blockElements[index - 1];

                    elements.push(element);

                    if (type === "up" && previousElement) {
                        elements.push(previousElement);
                    } else if (type === "down" && nextElement) {
                        elements.push(nextElement);
                    }
                }
            });

            return elements;
        }, [] as Element[]);

        updateElementsOrder(elements, block);
    };

    return {
        element,
        openElementModal,
        openDeleteElementModal,
        handleUpsertElementModalClose,
        handleDeleteElementModalClose,
        onEditElement,
        onDeleteElement,
        onCreateElement,
        upsertElement,
        loadingElementForm,
        deleteElement,
        loadingElementDelete,
        loadingUpdateElementsOrder,
        onUpdateElementOrder,
    };
};

export default useManageElements;
