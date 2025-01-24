import { useState } from "react";
import deleteElementService from "../../services/elements/deleteElementService";
import toast from "react-hot-toast";

const useDeleteElement = (onSuccess: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);

    const deleteElement = (id: number, name: string) => {
        setLoading(true);

        const promise = deleteElementService(id);

        toast
            .promise(
                promise,
                {
                    loading: "Eliminando...",
                    success: () => `Se elimino el elemento ${name}`,
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

    return { loading, deleteElement };
};

export default useDeleteElement;
