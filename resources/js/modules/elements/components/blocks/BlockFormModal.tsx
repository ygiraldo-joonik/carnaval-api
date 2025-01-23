import { Block } from "@/types/element.d";
import Modal from "@/Components/Modal";
import BlockForm from "./BlockForm";

export type BlockFormModalProps = {
    show: boolean;
    onClose: () => void;
    block: Block;
    loading: boolean;
    upsertBlock: (block: Block) => void;
};

export default function BlockFormModal({
    show,
    onClose,
    block,
    loading,
    upsertBlock,
}: BlockFormModalProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <BlockForm block={block} loading={loading} onSubmit={upsertBlock} />
        </Modal>
    );
}
