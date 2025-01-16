import { useState } from "react";
import toast from "react-hot-toast";
import deleteParadeService from "../services/deleteParadeService";

const useDeleteParade = (onSuccess: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);

    const deleteParade = (id: number, name: string) => {
        setLoading(true);
        try {
            const promise: Promise<null> = deleteParadeService(id);
            toast
                .promise(
                    promise,
                    {
                        loading: "Eliminando...",
                        success: () => `Se elimino el desfile ${name}`,
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

    return { deleteParade, loading };
};

export default useDeleteParade;
