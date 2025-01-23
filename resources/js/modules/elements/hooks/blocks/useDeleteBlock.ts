import { useState } from "react";
import deleteBlockService from "../../services/blocks/deleteBlockService";
import toast from "react-hot-toast";

const useDeleteBlock = (onSuccess: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);

    const deleteBlock = (id: number, name: string) => {
        setLoading(true);

        const promise = deleteBlockService(id);

        toast
            .promise(
                promise,
                {
                    loading: "Eliminando...",
                    success: () => `Se elimino el bloque ${name}`,
                    error: (err: any) => `hubo un error: ${err.toString()}`,
                },
                {
                    success: {
                        icon: "🔥",
                    },
                }
            )
            .then(() => {
                onSuccess();
            })
            .catch((error) => {
                console.error({ error });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { loading, deleteBlock };
};

export default useDeleteBlock;
