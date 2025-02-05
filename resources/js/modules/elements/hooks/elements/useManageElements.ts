import {
    Block,
    Element,
    ElementFormData,
    defaultElement,
} from "@/types/element.d";
import { useState } from "react";
import useUpsertElement from "./useUpsertElement";
import useDeleteElement from "./useDeleteElement";
import useManageBlocks from "../blocks/useManageBlocks";
import { ManageElementsViewProps } from "../../views/ManageElementsView";
import useUpdateElementsOrder from "./useUpdateElementsOrder";
import { ReorderType } from "../../context/ManageElementsContext";
import useUpdateElementPosition from "./useUpdateElementPosition";

export const defaultUseManageElements = {
    element: defaultElement,
    openElementModal: false,
    openDeleteElementModal: false,
    openUpdateElementPositionModal: false,
    handleUpsertElementModalClose: () => {},
    handleDeleteElementModalClose: () => {},
    handleUpdateElementPositionModalClose: () => {},
    onEditElement: (selectedElement: Element) => {},
    onDeleteElement: (selectedElement: Element) => {},
    onCreateElement: (block: Block) => {},
    onUpdateElementPosition: (element: Element, block: Block) => {},
    upsertElement: (element: ElementFormData) => {},
    deleteElement: (id: number, name: string) => {},
    updateElementPosition: (
        element: Element,
        block: Block,
        order: number
    ) => {},
    loadingElementForm: false,
    loadingElementDelete: false,
    loadingUpdateElementsOrder: false,
    loadingUpdateElementPosition: false,
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
    clearBlock,
}: ReturnType<typeof useManageBlocks> &
    Pick<
        ManageElementsViewProps,
        "parade"
    >): typeof defaultUseManageElements => {
    const [openElementModal, setOpenElementModal] = useState<boolean>(false);

    const [openDeleteElementModal, setOpenDeleteElementModal] =
        useState<boolean>(false);

    const [openUpdateElementPositionModal, setOpenUpdateElementPositionModal] =
        useState<boolean>(false);

    const [element, setElement] = useState<Element>(defaultElement);

    const handleUpsertElementModalClose = () => {
        setOpenElementModal(false);
        setTimeout(() => setElement(defaultElement), 500);
    };

    const handleDeleteElementModalClose = () => {
        setOpenDeleteElementModal(false);
        // setTimeout(() => setElement(defaultElement), 500);
    };

    const handleUpdateElementPositionModalClose = () => {
        setOpenUpdateElementPositionModal(false);
        setTimeout(() => {
            setElement(defaultElement);
            clearBlock();
        }, 500);
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
        handleUpsertElementModalClose();
    };

    const onUpdateElementPosition = (element: Element, block: Block) => {
        onUpsertElement(block);
        setElement(element);
        setOpenUpdateElementPositionModal(true);
    };

    const onUpdateElementPositionSuccess = () => {
        handleUpdateElementPositionModalClose();

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

    const { loading: loadingUpdateElementPosition, updateElementPosition } =
        useUpdateElementPosition(onUpdateElementPositionSuccess);

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
        openUpdateElementPositionModal,

        handleUpsertElementModalClose,
        handleDeleteElementModalClose,
        handleUpdateElementPositionModalClose,

        onEditElement,
        onDeleteElement,
        onCreateElement,
        onUpdateElementPosition,

        upsertElement,
        deleteElement,
        updateElementPosition,
        onUpdateElementOrder,

        loadingElementForm,
        loadingElementDelete,
        loadingUpdateElementsOrder,
        loadingUpdateElementPosition,
    };
};

export default useManageElements;
