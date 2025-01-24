import { Block, Element } from "@/types/element.d";
import Modal from "@/Components/Modal";
import { ElementType } from "@/types/element-type.d";
import UpdateElementPositionForm from "./UpdateElementsPositionForm";

export type UpdateElementPositionFormModalProps = {
    show: boolean;
    onClose: () => void;
};

export default function UpdateElementPositionFormModal({
    show,
    onClose,
}: UpdateElementPositionFormModalProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <UpdateElementPositionForm />
        </Modal>
    );
}
