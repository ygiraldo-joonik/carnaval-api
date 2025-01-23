import { Block, Element } from "@/types/element.d";
import Modal from "@/Components/Modal";
import ElementForm from "./ElementForm";
import { ElementType } from "@/types/element-type.d";

export type ElementFormModalProps = {
    show: boolean;
    onClose: () => void;
    element: Element;
    block: Block;
    elementTypes: ElementType[];
    loading: boolean;
    upsertElement: (element: Element) => void;
};

export default function ElementFormModal({
    show,
    onClose,
    element,
    block,
    elementTypes,
    loading,
    upsertElement,
}: ElementFormModalProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <ElementForm
                elementTypes={elementTypes}
                block={block}
                element={element}
                loading={loading}
                onSubmit={upsertElement}
            />
        </Modal>
    );
}
