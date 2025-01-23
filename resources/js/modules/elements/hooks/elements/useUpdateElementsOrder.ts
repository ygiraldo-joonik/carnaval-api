import { Block, Element } from "@/types/element.d";
import { useState } from "react";
import toast from "react-hot-toast";
import updateElementsOrderService from "../../services/elements/updateElementsOrderService";

const useUpdateElementsOrder = (onSuccess: () => void) => {
    const [loading, setLoading] = useState(false);
    const updateElementsOrder = (elements: Element[], block: Block): void => {
        setLoading(true);

        const [firstElement, secondElement] = elements;

        const promise = updateElementsOrderService({
            block_id: block.id!,
            elements: [
                { id: firstElement.id, order: secondElement.order },
                { id: secondElement.id, order: firstElement.order },
            ],
        });

        toast
            .promise(
                promise,
                {
                    loading: "Editando",
                    success: () => `Se edito el orden de los elementos`,
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

    return { loading, updateElementsOrder };
};

export default useUpdateElementsOrder;
