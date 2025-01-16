import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ElementType } from "../../../types/element-type";
import Modal from "@/Components/Modal";
import { Commet } from "react-loading-indicators";

export type DeleteElementTypeDialogProps = {
    show: boolean;
    onClose: () => void;
    elementType: ElementType;
    loading: boolean;
    deleteElementType: (id: number, name: string) => void;
};

export default function DeleteElementTypeDialog({
    show,
    onClose,
    elementType,
    loading,
    deleteElementType,
}: DeleteElementTypeDialogProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-xl">
                    ¿Estás seguro de eliminar el tipo de elemento{" "}
                    <strong>{elementType.name}</strong>?
                </h2>
                <div className="flex justify-end mt-4">
                    <button
                        disabled={loading}
                        className="text-gray-500  py-2 px-4 rounded-md mr-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        disabled={loading}
                        className=" py-2 px-4 rounded-md"
                        onClick={() =>
                            deleteElementType(elementType.id!, elementType.name)
                        }
                    >
                        Confirmar
                        {loading && (
                            <>
                                &nbsp;
                                <Commet
                                    color="#000"
                                    style={{ fontSize: "3px" }}
                                />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
