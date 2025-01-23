import { Parade } from "../../../types/parade.d";
import Modal from "@/Components/Modal";
import { Commet } from "react-loading-indicators";

export type DeleteParadeDialogProps = {
    show: boolean;
    onClose: () => void;
    parade: Parade;
    loading: boolean;
    deleteParade: (id: number, name: string) => void;
};

export default function DeleteParadeDialog({
    show,
    onClose,
    parade,
    loading,
    deleteParade,
}: DeleteParadeDialogProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-xl">
                    ¿Estás seguro de eliminar el desfile{" "}
                    <strong>{parade.name}</strong>?
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
                        onClick={() => deleteParade(parade.id!, parade.name)}
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
