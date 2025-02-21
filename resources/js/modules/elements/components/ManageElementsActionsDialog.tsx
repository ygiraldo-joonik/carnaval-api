import { useManageElementsContext } from "../context/ManageElementsContext";
import BlockFormModal from "./blocks/BlockFormModal";
import BulkCreateElementsDialog from "./blocks/BulkCreateElementsDialog";
import DeleteBlockDialog from "./blocks/DeleteBlockDialog";
import DeleteElementDialog from "./elements/DeleteElementDialog";
import ElementFormModal from "./elements/ElementFormModal";
import UpdateElementPositionFormModal from "./elements/UpdateElementPositionFormModal";

const ManageElementsActionsDialog = () => {
    const {
        // Elements
        element,
        upsertElement,
        loadingElementForm,
        openElementModal,
        handleUpsertElementModalClose,
        openDeleteElementModal,
        handleDeleteElementModalClose,
        deleteElement,
        loadingElementDelete,
        openUpdateElementPositionModal,
        handleUpdateElementPositionModalClose,
        onDeleteElement,
        handleBulkCreateElementsModalClose,
        bulkCreateElements,
        loadingBulkCreateElements,
        openBulkCreateElementsModal,

        elementTypes,

        // Blocks
        block,
        upsertBlock,
        loadingBlockForm,
        openBlockModal,
        handleUpsertBlockModalClose,
        openDeleteBlockModal,
        handleDeleteBlockModalClose,
        deleteBlock,
        loadingBlockDelete,
    } = useManageElementsContext();

    return (
        <>
            {/* Element Dialogs */}
            <ElementFormModal
                elementTypes={elementTypes}
                element={element}
                block={block}
                loading={loadingElementForm}
                upsertElement={upsertElement}
                show={openElementModal && !openDeleteElementModal}
                onClose={handleUpsertElementModalClose}
                onDelete={onDeleteElement}
            />

            <DeleteElementDialog
                element={element}
                show={openDeleteElementModal}
                onClose={handleDeleteElementModalClose}
                deleteElement={deleteElement}
                loading={loadingElementDelete}
            />

            <UpdateElementPositionFormModal
                show={openUpdateElementPositionModal}
                onClose={handleUpdateElementPositionModalClose}
            />

            <BulkCreateElementsDialog
                bulkCreateElements={bulkCreateElements}
                onClose={handleBulkCreateElementsModalClose}
                block={block}
                loading={loadingBulkCreateElements}
                show={openBulkCreateElementsModal}
            />

            {/* Block Dialogs */}
            <BlockFormModal
                block={block}
                loading={loadingBlockForm}
                upsertBlock={upsertBlock}
                show={openBlockModal}
                onClose={handleUpsertBlockModalClose}
            />

            <DeleteBlockDialog
                block={block}
                show={openDeleteBlockModal}
                onClose={handleDeleteBlockModalClose}
                deleteBlock={deleteBlock}
                loading={loadingBlockDelete}
            />
        </>
    );
};

export default ManageElementsActionsDialog;
