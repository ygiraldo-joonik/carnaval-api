import { Parade } from "../../../types/parade.d";
import Modal from "@/Components/Modal";
import ParadeForm from "./ParadeForm";

export type ParadeFormModalProps = {
    show: boolean;
    onClose: () => void;
    parade: Parade;
    loading: boolean;
    upsertParade: (parade: Parade) => void;
    onDelete:(e:Parade)=> void;
};

export default function ParadeFormModal({
    show,
    onClose,
    parade,
    loading,
    upsertParade,
    onDelete
}: ParadeFormModalProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <ParadeForm
                parade={parade}
                loading={loading}
                onSubmit={upsertParade}
                onDelete={onDelete}
            />
        </Modal>
    );
}
