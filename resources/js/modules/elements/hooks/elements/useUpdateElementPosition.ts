import { Block, Element } from "@/types/element.d";
import { useState } from "react";
import toast from "react-hot-toast";
import updateElementPositionService from "../../services/elements/updateElementPositionService";

const useUpdateElementPosition = (onSuccess: () => void) => {
    const [loading, setLoading] = useState(false);
    const updateElementPosition = (
        element: Element,
        block: Block,
        order: number
    ): void => {
        setLoading(true);

        const promise = updateElementPositionService({
            block_id: block.id!,
            element_id: element.id!,
            order,
        });

        toast
            .promise(
                promise,
                {
                    loading: "Editando",
                    success: () =>
                        `Se movió el elemento ${element.name} al bloque ${block.name}`,
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

    return { loading, updateElementPosition };
};

export default useUpdateElementPosition;
