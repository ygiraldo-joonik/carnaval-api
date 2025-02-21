import { Block, Element } from "@/types/element.d";
import Modal from "@/Components/Modal";
import { Commet } from "react-loading-indicators";
import ImportParadeElements from "@/modules/parades/components/ImportParadeElemetsPassed";

export type BulkCreateElementsDialogProps = {
    show: boolean;
    onClose: () => void;
    block: Block;
    loading: boolean;
    bulkCreateElements: (file: File) => void;
};

export default function BulkCreateElementsDialog({
    show,
    onClose,
    block,
    loading,
    bulkCreateElements,
}: BulkCreateElementsDialogProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-xl">
                    Subir elementos para el bloque <strong>{block.name}</strong>
                </h2>

                <ImportParadeElements
                    loading={loading}
                    onFileUpload={bulkCreateElements}
                    fill
                />
            </div>
        </Modal>
    );
}
