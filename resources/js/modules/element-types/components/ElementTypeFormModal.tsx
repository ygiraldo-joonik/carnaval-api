import { ElementType } from "@/types/element-type.d";
import Modal from "@/Components/Modal";
import ElementTypeForm from "./ElementTypeForm";

export type ElementTypeFormModalProps = {
    show: boolean;
    onClose: () => void;
    elementType: ElementType;
    loading: boolean;
    upsertElementType: (elementType: ElementType) => void;
};

export default function ElementTypeFormModal({
    show,
    onClose,
    elementType,
    loading,
    upsertElementType,
}: ElementTypeFormModalProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <ElementTypeForm
                elementType={elementType}
                loading={loading}
                onSubmit={upsertElementType}
            />
        </Modal>
    );
}
