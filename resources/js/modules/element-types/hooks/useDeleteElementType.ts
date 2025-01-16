import { useState } from "react";
import toast from "react-hot-toast";
import deleteElementTypeService from "../services/deleteElementTypeService";

const useDeleteElementType = (onSuccess: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);

    const deleteElementType = (id: number, name: string) => {
        setLoading(true);
        try {
            const promise: Promise<null> = deleteElementTypeService(id);
            toast
                .promise(
                    promise,
                    {
                        loading: "Eliminando...",
                        success: () => `Se elimino el tipo de elemento ${name}`,
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
        } catch (error) {
            setLoading(false);
            console.error({ error });
        }
    };

    return { deleteElementType, loading };
};

export default useDeleteElementType;
